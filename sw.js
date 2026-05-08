var CACHE_NAME = 'matharena-v19';
var STATIC_ASSETS = [
  '/',
  '/waterloo-math-contests.html',
  '/index.html',
  '/app.js',
  '/data.js',
  '/data-batch2.js',
  '/data-cayley-2015-2020.js',
  '/data-fermat-2015-2025.js',
  '/data-pascal-2021-2023.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests (CDN, CEMC, etc.)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      // Network first, fallback to cache
      return fetch(event.request).then(function(response) {
        // Cache successful responses
        if (response && response.status === 200) {
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(function() {
        // Offline — serve from cache
        return cached;
      });
    })
  );
});
