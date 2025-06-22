if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/cordel/app/service-worker.js").then((registration) => {
      console.log("Service Worker registrado com sucesso!", registration);

      // Verifica se há uma nova versão do Service Worker disponível
      registration.onupdatefound = () => {
        const newWorker = registration.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // Nova versão do SW instalada, pede para atualizar a página
              console.log("Nova versão disponível! Atualize a página.");
              if (confirm("Nova versão disponível. Atualizar agora?")) {
                window.location.reload();
              }
            }
          }
        };
      };
    }).catch((error) => {
      console.log("Erro ao registrar o Service Worker:", error);
    });
  });
}

// Instalação do PWA no celular
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;

  // Exibir um botão para instalação
  const installButton = document.createElement("button");
  installButton.textContent = "Instalar App";
  installButton.style.position = "fixed";
  installButton.style.bottom = "20px";
  installButton.style.right = "20px";
  installButton.style.padding = "10px";
  installButton.style.background = "#28a745";
  installButton.style.color = "white";
  installButton.style.border = "none";
  installButton.style.borderRadius = "5px";
  document.body.appendChild(installButton);

  installButton.addEventListener("click", () => {
    installButton.style.display = "none"; 
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuário instalou o PWA");
      } else {
        console.log("Usuário cancelou a instalação");
      }
      deferredPrompt = null;
    });
  });
});
