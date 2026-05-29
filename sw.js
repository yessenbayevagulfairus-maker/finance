const CACHE = 'fin-v3';
const BASE = self.registration.scope;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll([
      BASE + 'index.html',
      BASE + 'manifest.json',
      BASE + 'icon-192.png',
      BASE + 'icon-512.png'
    ])).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() =>
      caches.match(BASE + 'index.html')
    ))
  );
});
