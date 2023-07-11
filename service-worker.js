//Il faut mettre à jour le nom de la cache quand on push une modification
const CACHE_NAME = 'static-cache-v5';

//Liste des fichiers à mettre en cache
const FILES_TO_CACHE = [
    'offline.html',
    'index.html'
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Mise en cache
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Mise en cache des fichiers');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    //Suppression de la vielle cache
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache',
                        key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    //console.log('[ServiceWorker] Fetch', evt.request.url);
    //Gestion de l'évènement fetch
    if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('offline.html');
                    });
            })
    );
});
