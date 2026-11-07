document.addEventListener("DOMContentLoaded", () => {
  const isSubfolder = window.location.pathname.includes("/html/");
  const headerPath = isSubfolder ? "header.html" : "html/header.html";
  const footerPath = isSubfolder ? "footer.html" : "html/footer.html";

  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) {
    fetch(headerPath)
      .then(res => res.text())
      .then(data => {
        headerPlaceholder.innerHTML = data;

        const prefix = isSubfolder ? "../" : "";
        const htmlPrefix = isSubfolder ? "" : "html/";

        const logoImg = headerPlaceholder.querySelector(".logo-icono-img");
        if (logoImg) logoImg.src = `${prefix}img/logo/Logo-de-Cafeteria-Noble-Aroma.png`;

        const carroImg = headerPlaceholder.querySelector("#Carro");
        if (carroImg) carroImg.src = `${prefix}img/icos/01_carrito.png`;

        const btnInicio = headerPlaceholder.querySelector("#inicio");
        const logoInicio = headerPlaceholder.querySelector(".logo-container");
        const btnProductos = headerPlaceholder.querySelector("#productos");
        const btnDescuentos = headerPlaceholder.querySelector("#descuentos");
        const btnAcerca = headerPlaceholder.querySelector("#acerca");

        if (btnInicio) btnInicio.setAttribute("href", `${prefix}index.html`);
        if (logoInicio) logoInicio.setAttribute("href", `${prefix}index.html`);
        if (btnProductos) btnProductos.setAttribute("href", `${htmlPrefix}productos.html`);
        if (btnDescuentos) btnDescuentos.setAttribute("href", `${htmlPrefix}descuentos.html`);
        if (btnAcerca) btnAcerca.setAttribute("href", `${htmlPrefix}conocenos.html`);

        const menuToggle = headerPlaceholder.querySelector("#menu-toggle");
        const navMenu = headerPlaceholder.querySelector("#nav-menu");
        if (menuToggle && navMenu) {
          menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
        }
      });
  }

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch(footerPath)
      .then(res => res.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;

        const prefix = isSubfolder ? "../" : "";
        const htmlPrefix = isSubfolder ? "" : "html/";

        const footerLogo = footerPlaceholder.querySelector(".footer-logo");
        if (footerLogo) footerLogo.src = `${prefix}img/logo/Logo-de-Cafeteria-Noble-Aroma.png`;

        const enlacesFooter = footerPlaceholder.querySelectorAll(".footer-col ul a, .footer-bootom a");
        enlacesFooter.forEach(a => {
          const href = a.getAttribute("href");
          if (href && !href.startsWith("http") && !href.startsWith("#")) {
            if (href.startsWith("productos.html")) a.setAttribute("href", `${htmlPrefix}${href}`);
            else if (href.startsWith("descuentos.html")) a.setAttribute("href", `${htmlPrefix}${href}`);
            else if (href.startsWith("conocenos.html")) a.setAttribute("href", `${htmlPrefix}${href}`);
            else if (href.startsWith("index.html")) a.setAttribute("href", `${prefix}${href}`);
          }
        });
      });
  }

  const contenedor = document.getElementById("carrusel-contenedor");
  const siguiente = document.getElementById("btn-next");
  const anterior = document.getElementById("btn-prev");
  const puntos = document.querySelectorAll(".punto");

  if (contenedor) {
    let indice = 0;
    let intervalo = null;
    const tiempoAutoplay = 4000;
    const totalImagenes = document.querySelectorAll(".carrusel-slide").length;

    function actualizarCarrusel() {
      contenedor.style.transform = `translateX(-${indice * 100}%)`;
      puntos.forEach((punto, i) => punto.classList.toggle("activo", i === indice));
    }

    function avanzarSiguiente() {
      indice = (indice + 1) % totalImagenes;
      actualizarCarrusel();
    }

    function retrocederAnterior() {
      indice = (indice - 1 + totalImagenes) % totalImagenes;
      actualizarCarrusel();
    }

    function iniciarAutoPlay() {
      if (intervalo) clearInterval(intervalo);
      intervalo = setInterval(avanzarSiguiente, tiempoAutoplay);
    }

    function detenerAutoPlay() {
      if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
      }
    }

    if (siguiente) siguiente.addEventListener("click", () => { detenerAutoPlay(); avanzarSiguiente(); iniciarAutoPlay(); });
    if (anterior) anterior.addEventListener("click", () => { detenerAutoPlay(); retrocederAnterior(); iniciarAutoPlay(); });
    puntos.forEach((punto, i) => {
      punto.addEventListener("click", () => { detenerAutoPlay(); indice = i; actualizarCarrusel(); iniciarAutoPlay(); });
    });
    contenedor.addEventListener("mouseenter", detenerAutoPlay);
    contenedor.addEventListener("mouseleave", iniciarAutoPlay);
    iniciarAutoPlay();
  }

  const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animar-scroll').forEach(el => observador.observe(el));
});

function mostrarHito(indice) {
  const nodos = document.querySelectorAll('.timeline-nodo');
  const hitos = document.querySelectorAll('.timeline-hito');
  nodos.forEach((nodo, i) => nodo.classList.toggle('active', i === indice));
  hitos.forEach((hito, i) => hito.classList.toggle('active', i === indice));
}

function cambiarTab(evt, nombreTab) {
  const contenidos = document.querySelectorAll('.tab-contenido');
  const botones = document.querySelectorAll('.btn-tab');
  contenidos.forEach(c => c.classList.remove('active'));
  botones.forEach(b => b.classList.remove('active'));
  document.getElementById(nombreTab).classList.add('active');
  evt.currentTarget.classList.add('active');
}
