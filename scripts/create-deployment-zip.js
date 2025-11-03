const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Creates a deployment-ready zip file from the build folder
 * This script is designed to run after the build process completes
 */

const createDeploymentZip = () => {
  const buildDir = path.join(__dirname, '..', 'build');
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  // Check if build directory exists
  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  try {
    // Read package.json to get version and name
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const { name, version } = packageJson;
    
    // Create timestamp for unique deployment files
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const zipFileName = `${name}-v${version}-${timestamp}.zip`;
    const zipFilePath = path.join(__dirname, '..', zipFileName);
    
    console.log('🚀 Creating deployment zip file...');
    console.log(`📦 Package: ${name} v${version}`);
    console.log(`📁 Source: build/`);
    console.log(`📄 Output: ${zipFileName}`);
    
    // Check if zip command is available (works on macOS and Linux)
    try {
      execSync('which zip', { stdio: 'ignore' });
    } catch (error) {
      console.error('❌ zip command not found. Please install zip utility.');
      process.exit(1);
    }
    
    // Create zip file from build directory
    const zipCommand = `cd "${buildDir}" && zip -r "${zipFilePath}" . -x "*.DS_Store" "*.map"`;
    
    console.log('⏳ Compressing files...');
    execSync(zipCommand, { stdio: 'inherit' });
    
    // Get file size for confirmation
    const stats = fs.statSync(zipFilePath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log('✅ Deployment zip created successfully!');
    console.log(`📊 File size: ${fileSizeInMB} MB`);
    console.log(`📍 Location: ${zipFileName}`);
    console.log('');
    console.log('🎯 Ready for deployment!');
    console.log('   You can now upload this zip file to your hosting provider.');
    
  } catch (error) {
    console.error('❌ Error creating deployment zip:', error.message);
    process.exit(1);
  }
};

// Run the script
createDeploymentZip();
