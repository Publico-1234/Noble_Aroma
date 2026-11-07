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

        
        const prefix = isSubfolder ? "../" : "";
        const htmlPrefix = isSubfolder ? "" : "html/";

      
        const logoImg = headerContainer.querySelector(".logo-icono-img");
        if (logoImg) logoImg.src = `${prefix}img/logo/Logo-de-Cafeteria-Noble-Aroma.png`;

        const carroImg = headerContainer.querySelector("#Carro");
        if (carroImg) carroImg.src = `${prefix}img/icos/01-carrito.png`;

       
        const btnInicio = document.getElementById("inicio");
        const logoInicio = headerContainer.querySelector(".logo-container");
        const btnProductos = document.getElementById("productos");
        const btnDescuentos = document.getElementById("descuentos");
        const btnAcerca = document.getElementById("acerca");

        if (btnInicio) btnInicio.setAttribute("href", `${prefix}index.html`);
        if (logoInicio) logoInicio.setAttribute("href", `${prefix}index.html`);
        if (btnProductos) btnProductos.setAttribute("href", `${htmlPrefix}productos.html`);
        if (btnDescuentos) btnDescuentos.setAttribute("href", `${htmlPrefix}descuentos.html`);
        if (btnAcerca) btnAcerca.setAttribute("href", `${htmlPrefix}conocenos.html`);

        const menuToggle = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");
        if (menuToggle && navMenu) {
          menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
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
        const prefix = isSubfolder ? "../" : "";
        const htmlPrefix = isSubfolder ? "" : "html/";

        const footerLogo = footerContainer.querySelector(".footer-logo");
        if (footerLogo) footerLogo.src = `${prefix}img/logo/Logo-de-Cafeteria-Noble-Aroma.png`;

        const enlacesFooter = footerContainer.querySelectorAll(".footer-columna ul a");
        if (enlacesFooter.length >= 4) {
          enlacesFooter[0].setAttribute("href", `${prefix}index.html`);
          enlacesFooter[1].setAttribute("href", `${htmlPrefix}productos.html`);
          enlacesFooter[2].setAttribute("href", `${htmlPrefix}descuentos.html`);
          enlacesFooter[3].setAttribute("href", `${htmlPrefix}conocenos.html`);
        }
      })
      .catch(error => console.error("Error al cargar el footer:", error));
  }
});
