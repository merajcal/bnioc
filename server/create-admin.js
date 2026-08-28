const envFile = process.env.BNIOC_ENV_FILE || '.env';
require('dotenv').config({ path: envFile, override: true });
if (!globalThis.WebSocket) globalThis.WebSocket = require('ws');

const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || '';
const name = process.env.ADMIN_NAME || 'BNIOC Academy Admin';
const requestTimeoutMs = Number(process.env.ADMIN_REQUEST_TIMEOUT_MS || 15000);
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || '';

if (!email || password.length < 8) {
  console.error(`Set ADMIN_EMAIL and ADMIN_PASSWORD (minimum 8 characters) before running this command. Environment file: ${envFile}`);
  process.exit(1);
}

if (!supabaseUrl || !supabaseSecretKey) {
  console.error(`SUPABASE_URL and SUPABASE_SECRET_KEY are required. Check ${envFile}.`);
  process.exit(1);
}

if (!Number.isFinite(requestTimeoutMs) || requestTimeoutMs < 1000) {
  console.error('ADMIN_REQUEST_TIMEOUT_MS must be a number of at least 1000 milliseconds.');
  process.exit(1);
}

let supabaseHost;
try {
  supabaseHost = new URL(supabaseUrl).host;
} catch {
  console.error(`SUPABASE_URL is not a valid URL. Check ${envFile}.`);
  process.exit(1);
}

const fetchWithTimeout = async (input, init = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), requestTimeoutMs);
  const signal = init.signal && typeof AbortSignal.any === 'function'
    ? AbortSignal.any([init.signal, controller.signal])
    : controller.signal;

  try {
    return await fetch(input, { ...init, signal });
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error(`Supabase request timed out after ${requestTimeoutMs}ms (${supabaseHost}).`);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
};

(async () => {
  console.log(`Loading Supabase configuration from ${envFile}...`);
  const { createAdminClient } = await import('@supabase/server/core');
  const admin = createAdminClient({
    supabaseOptions: { global: { fetch: fetchWithTimeout } },
  });

  console.log(`Checking Supabase Auth at ${supabaseHost}...`);
  const { data: users, error: listError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (listError) throw new Error(`Could not list Supabase Auth users: ${listError.message}`);

  let authUser = users.users.find((user) => user.email?.toLowerCase() === email);
  if (authUser) {
    console.log(`Updating existing Auth user ${email}...`);
    const { data: updated, error: updateError } = await admin.auth.admin.updateUserById(authUser.id, {
      password,
      email_confirm: true,
      user_metadata: { ...(authUser.user_metadata || {}), name },
    });
    if (updateError) throw new Error(`Could not update Supabase Auth user: ${updateError.message}`);
    authUser = updated.user;
  } else {
    console.log(`Creating Auth user ${email}...`);
    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });
    if (createError || !created?.user) throw new Error(`Could not create Supabase Auth user: ${createError?.message || 'unknown error'}`);
    authUser = created.user;
  }

  console.log('Saving the admin profile...');
  const { error: profileError } = await admin.from('users').upsert({ id: authUser.id, name, email, role: 'admin' }, { onConflict: 'id' });
  if (profileError) throw new Error(`Could not recreate admin profile: ${profileError.message}`);
  console.log(`Supabase admin account ready: ${email}`);
})().catch((error) => { console.error(error.message); process.exit(1); });
