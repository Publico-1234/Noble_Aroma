document.addEventListener("DOMContentLoaded", () => {
  const isSubfolder = window.location.pathname.includes("/html/");
  const headerPath = isSubfolder ? "header.html" : "html/header.html";
  const footerPath = isSubfolder ? "footer.html" : "html/footer.html";

  const headerContainer = document.getElementById("header-placeholder");
  if (headerContainer) {
    fetch(headerPath)
      .then(response => {
        if (!response.ok) throw new Error("Header no encontrado");
        return response.text();
      })
      .then(data => {
        headerContainer.innerHTML = data;
        
        const menuToggle = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");
        if (menuToggle && navMenu) {
          menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
          });
        }
      })
      .catch(error => console.error("Error al cargar el header:", error));
  }

  const footerContainer = document.getElementById("footer-placeholder");
  if (footerContainer) {
    fetch(footerPath)
      .then(response => {
        if (!response.ok) throw new Error("Footer no encontrado");
        return response.text();
      })
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(error => console.error("Error al cargar el footer:", error));
  }
});

function mostrarHito(indice) {
  const nodos = document.querySelectorAll('.timeline-nodo');
  const hitos = document.querySelectorAll('.timeline-hito');

  nodos.forEach(nodo => nodo.classList.remove('active'));
  hitos.forEach(hito => hito.classList.remove('active'));

  if (nodos[indice]) nodos[indice].classList.add('active');
  if (hitos[indice]) hitos[indice].classList.add('active');
}

function cambiarTab(event, tabId) {
  const botones = document.querySelectorAll('.btn-tab');
  const contenidos = document.querySelectorAll('.tab-contenido');

  botones.forEach(btn => btn.classList.remove('active'));
  contenidos.forEach(c => c.classList.remove('active'));

  event.currentTarget.classList.add('active');
  const objetivo = document.getElementById(tabId);
  if (objetivo) objetivo.classList.add('active');
}
