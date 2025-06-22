const CACHE_NAME = "versao-1"; // Alterar versão para forçar atualização
const urlsToCache = [
  
    "/cordel/app/imagens/",
    "/cordel/ima",
    
];

// Instalação do Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Arquivos adicionados ao cache");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Ativa imediatamente a nova versão
});

// Ativação do Service Worker (remove caches antigos)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Removendo cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Garante que o novo SW tome controle imediato
});

// Intercepta requisições e atualiza cache automaticamente
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          cache.put(event.request, response.clone()); // Atualiza o cache com novos arquivos
          return response;
        })
        .catch(() => caches.match(event.request)); // Usa o cache offline caso não tenha internet
    })
  );
});