const CACHE_NAME = "pwa-cache-v1";

const ASSETS = [
    "/",
    "/index.html",
    "/navigation.css",
    "/script.js",
    "/students.js",
    "/students.css",
    "/students.html",
    "/icons",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Кешування ресурсів...");

      return cache.addAll(ASSETS).catch(console.error);
    })
  );
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {

        const networkFetch = fetch(event.request).then((networkResponse) => {

            cache.put(event.request, networkResponse.clone());
            return networkResponse;
        });

        return cachedResponse || networkFetch;
      });
    })
  );
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => {
      console.log("Новий Service Worker активовано.");
      return self.clients.claim();
    })
  );
});