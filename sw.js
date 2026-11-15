/* ÉLEC TERRAIN PRO — Cache PWA : fichiers d'application uniquement.
 * Aucune donnée client, devis ou facture n'est envoyée au serveur.
 */
const APP_CACHE = 'elec-terrain-pro-app-v3-2026-11-15';
const PREFIX = 'elec-terrain-pro-app-';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];
const APP_URL = new URL('./index.html', self.location.href).href;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== APP_CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Ne jamais intercepter WhatsApp, Google ou d'autres sites externes.
  if (url.origin !== self.location.origin ||
      !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // Navigations : obtenir les mises à jour quand le réseau est disponible.
        const response = await fetch(request);
        if (response.ok && response.type === 'basic') {
          const cache = await caches.open(APP_CACHE);
          await cache.put(APP_URL, response.clone());
        }
        return response;
      } catch (error) {
        return await caches.match(APP_URL) ||
               await caches.match(new URL('./', self.location.href).href) ||
               Response.error();
      }
    })());
    return;
  }

  // Ressources internes : charge instantanée hors connexion.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') {
        const cache = await caches.open(APP_CACHE);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return Response.error();
    }
  })());
});
