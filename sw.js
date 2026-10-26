
const CACHE = "minhas-musicas-v1";
const ARQUIVOS = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", evento => {
  evento.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", evento => {
  evento.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", evento => {
  if (evento.request.method !== "GET") return;

  evento.respondWith(
    caches.match(evento.request).then(resposta => resposta || fetch(evento.request))
  );
});
