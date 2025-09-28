const CACHE_NAME = 'bnioc-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  '/public/assets/logo.png',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Source+Sans+Pro:wght@300;400;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Cache install failed:', error);
      })
  );
  self.skipWaiting();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(function(response) {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(function() {
          // Return offline page for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Background sync for form submissions
self.addEventListener('sync', function(event) {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

function syncContactForm() {
  return new Promise(function(resolve, reject) {
    // Get stored form data from IndexedDB
    const request = indexedDB.open('bnioc-db', 1);
    
    request.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(['contact-forms'], 'readonly');
      const store = transaction.objectStore('contact-forms');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = function() {
        const forms = getAllRequest.result;
        
        // Send each form
        const promises = forms.map(form => {
          return fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.data)
          }).then(response => {
            if (response.ok) {
              // Remove from IndexedDB after successful send
              const deleteTransaction = db.transaction(['contact-forms'], 'readwrite');
              const deleteStore = deleteTransaction.objectStore('contact-forms');
              deleteStore.delete(form.id);
            }
          });
        });
        
        Promise.all(promises).then(() => resolve()).catch(() => reject());
      };
    };
  });
}

// Push notifications
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'New update from BNIOC!',
    icon: '/public/assets/logo.png',
    badge: '/public/assets/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/public/assets/logo.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/public/assets/logo.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('BNIOC Cricket Academy', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', function(event) {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

function syncContent() {
  return fetch('/api/content-updates')
    .then(response => response.json())
    .then(data => {
      // Update cached content if needed
      if (data.hasUpdates) {
        return caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(data.updatedUrls);
        });
      }
    })
    .catch(error => {
      console.log('Content sync failed:', error);
    });
}
