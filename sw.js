// Service Worker for caching and offline support
const CACHE_NAME = 'gpsofficialhim-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/main.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://unpkg.com/aos@next/dist/aos.js',
    'https://unpkg.com/aos@next/dist/aos.css'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache).catch(() => {
                    // Gracefully handle if some URLs fail
                    return cache.addAll([
                        '/index.html',
                        '/css/styles.css',
                        '/js/main.js'
                    ]);
                });
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // For local requests, use cache first, fallback to network
    if (event.request.url.includes(self.location.origin)) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request).then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                    });
                })
                .catch(() => {
                    // Return offline page if needed
                    return new Response('Offline - Please check your connection');
                })
        );
    }
});
