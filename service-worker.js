//IMPORTANT : Il faut mettre à jour le nom de la cache quand on push une modification
const CACHE_NAME = 'static-cache-v5';

//Liste des fichiers à mettre en cache
const FILES_TO_CACHE = [
    'offline.html'
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
    //Suppression de la vielle cache si son nom est différent
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
    console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Gestion de l'évènement fetch (accès à une ressource)
    if (evt.request.mode !== 'navigate') {
        return;
    }
    /* Si internet coupe load la cache: */
self.addEventListener("fetch", (evt) => {
	console.log("[ServiceWorker] Fetch", evt.request.url);
	//Add fetch event handler here.
	if (evt.request.mode !== "navigate") {
		// Not a page navigation, bail.
		return;
	}
	evt.respondWith(
		fetch(evt.request)
			.then((response) => {
				// Si la réponse est OK, on la retourne
				if (response.ok) {
					return response;
				}
				// Sinon, on retourne la page offline
				return caches.open(CACHE_NAME).then((cache) => cache.match("offline.html"));
			})
			.catch(() => {
				console.log("[ServiceWorker] fetch().catch() open cache");
				return caches.open(CACHE_NAME).then((cache) => cache.match("offline.html"));
			})
	);
});
});
