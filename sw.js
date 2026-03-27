// frontend/sw.js

const CACHE_NAME = 'stemdetective-cache-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/faq.html',
    '/faq.js',
    '/fotos/vote.jpg'
];

// Install event: cache alle statische assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(URLS_TO_CACHE))
    );
    self.skipWaiting();
});

// Activate event: schoon oude caches op
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch event: serve uit cache indien mogelijk
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => {
                // fallback indien offline
                if(event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});
