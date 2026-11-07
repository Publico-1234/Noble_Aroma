const productos = [
  { id: 1, nombre: "Galletas NY", categoria: "reposteria", precio: 6500, imagen: "img/productos/galletasNY.jpeg" },
  { id: 2, nombre: "Torta de zanahoria", categoria: "reposteria", precio: 8500, imagen: "img/productos/Torta-de-zanahoria.jpeg" },
  { id: 3, nombre: "Cheesecake", categoria: "reposteria", precio: 12000, imagen: "img/productos/cheesecake.jpeg" },
  { id: 4, nombre: "Espiral de queso", categoria: "reposteria", precio: 5000, imagen: "img/productos/Espiral-de-queso.jpeg" },
  { id: 5, nombre: "Mini croissant", categoria: "pan", precio: 800, imagen: "img/productos/Mini-Croissant.jpeg" },
  { id: 6, nombre: "Pan de queso", categoria: "pan", precio: 2000, imagen: "img/productos/Pan-de-queso.webp" },
  { id: 7, nombre: "Croissant de chocolate", categoria: "pan", precio: 12000, imagen: "img/productos/pan-de-chocolate.png" },
  { id: 8, nombre: "Croissant de arequipe", categoria: "pan", precio: 12000, imagen: "img/productos/Croissant-de-arequipe.jpeg" },
  { id: 9, nombre: "Pan de mantequilla", categoria: "pan", precio: 3000, imagen: "img/productos/Pan-de-mantequilla.jpeg" },
  { id: 10, nombre: "Deditos horneados", categoria: "pan", precio: 4000, imagen: "img/productos/Deditos-horneados.jpg" },
  { id: 11, nombre: "Brownie", categoria: "reposteria", precio: 8000, imagen: "img/productos/Brownie.jpg" },
  { id: 12, nombre: "Sandwich", categoria: "pan", precio: 13500, imagen: "img/productos/sandwich.png" },
  { id: 13, nombre: "Pan súper queso", categoria: "pan", precio: 5000, imagen: "img/productos/Pan-super-queso.webp" },
  { id: 14, nombre: "Aromática de manzanilla", categoria: "aromaticas", precio: 3000, imagen: "img/productos/Aromatica-de-manzanilla.jpeg" },
  { id: 15, nombre: "Aromática de hierbabuena", categoria: "aromaticas", precio: 3000, imagen: "img/productos/Aromatica-de-hierbabuena.jpeg" },
  { id: 16, nombre: "Té negro", categoria: "aromaticas", precio: 3000, imagen: "img/productos/Te-negro.jpg" },
  { id: 17, nombre: "Aromática natural de frutos rojos", categoria: "aromaticas", precio: 3000, imagen: "img/productos/aromaticas.jpeg" },
  { id: 18, nombre: "Café tinto", categoria: "cafe", precio: 3000, imagen: "img/productos/Cafe-tinto.webp" },
  { id: 19, nombre: "Espresso", categoria: "cafe", precio: 4000, imagen: "img/productos/Espresso.webp" },
  { id: 20, nombre: "Café Amaretto", categoria: "cafe", precio: 5000, imagen: "img/productos/Cafe-Amaretto.webp" },
  { id: 21, nombre: "Cappuccino", categoria: "cafe", precio: 10000, imagen: "img/productos/Cappuccino.png" },
  { id: 22, nombre: "Cappuccino Coco", categoria: "cafe", precio: 10000, imagen: "img/productos/Cappuccino-Coco.jpg" },
  { id: 23, nombre: "Cappuccino Frutos Rojos", categoria: "cafe", precio: 10000, imagen: "img/productos/Cappuccino-Frutos-Rojos.png" },
  { id: 24, nombre: "Latte", categoria: "cafe", precio: 7000, imagen: "img/productos/Latte.jpg" },
  { id: 25, nombre: "Mocaccino caliente", categoria: "cafe", precio: 3000, imagen: "img/productos/Mocaccino-caliente.avif" },
  { id: 26, nombre: "Mocaccino frío", categoria: "cafe", precio: 11000, imagen: "img/productos/Mocaccino-frio.png" },
  { id: 27, nombre: "Latte frío", categoria: "cafe", precio: 8000, imagen: "img/productos/Latte-frio.webp" },
  { id: 28, nombre: "Coca Cola", categoria: "bebidas", precio: 3000, imagen: "img/productos/Coca-Cola.jpg" },
  { id: 29, nombre: "Néctar en caja", categoria: "bebidas", precio: 3000, imagen: "img/productos/Nectar-en-caja.jpeg" },
  { id: 30, nombre: "Agua", categoria: "bebidas", precio: 2000, imagen: "img/productos/Agua.png" },
  { id: 31, nombre: "Jugo natural en agua", categoria: "bebidas", precio: 7000, imagen: "img/productos/jugo.png" },
  { id: 32, nombre: "Jugo natural en leche", categoria: "bebidas", precio: 9000, imagen: "img/productos/jugo-en-leche.jpg" },
];

const destacados = [1, 3, 7, 21, 24, 26];

function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function obtenerRutaImagen(ruta) {
  if (!ruta) return "";
  const esSubcarpeta = window.location.pathname.includes("/html/");
  const rutaLimpia = ruta.replace(/^(\.\.\/|\/)/, "");
  return esSubcarpeta ? `../${rutaLimpia}` : rutaLimpia;
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoriaParam = urlParams.get('categoria');
  if (categoriaParam) {
    const radioCategoria = document.querySelector(`input[name="categoria"][value="${categoriaParam}"]`);
    if (radioCategoria) radioCategoria.checked = true;
  }

  const lista = document.getElementById("listaProductos");
  const listaDestacados = document.getElementById("listaDestacados");
  const buscador = document.getElementById("buscarProducto");
  const precioMaximo = document.getElementById("precioMaximo");
  const valorPrecio = document.getElementById("valorPrecio");
  const orden = document.getElementById("orden");
  const contador = document.getElementById("contadorProductos");
  const sinProductos = document.getElementById("sinProductos");

  const modal = document.getElementById("modal-pedido");
  const cerrarModalBtn = document.getElementById("cerrar-modal");
  const formPedido = document.getElementById("form-pedido");
  const modalImg = document.getElementById("modal-img");
  const modalNombre = document.getElementById("modal-nombre");
  const modalPrecio = document.getElementById("modal-precio");
  
  const toast = document.getElementById("toast");
  const toastMensaje = document.getElementById("toast-mensaje");

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const btnAbrirFiltros = document.getElementById("btn-abrir-filtros");
  const panelFiltros = document.getElementById("panel-filtros");
  const overlayFiltros = document.getElementById("overlay-filtros");
  const cerrarFiltros = document.getElementById("cerrar-filtros");
  const limpiarFiltrosMobile = document.getElementById("limpiarFiltros-mobile");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
  }

  if (btnAbrirFiltros && panelFiltros && overlayFiltros) {
    btnAbrirFiltros.addEventListener("click", () => {
      panelFiltros.classList.add("active");
      overlayFiltros.classList.add("active");
    });
  }

  function cerrarPanelFiltros() {
    if (panelFiltros) panelFiltros.classList.remove("active");
    if (overlayFiltros) overlayFiltros.classList.remove("active");
  }

  if (cerrarFiltros) cerrarFiltros.addEventListener("click", cerrarPanelFiltros);
  if (overlayFiltros) overlayFiltros.addEventListener("click", cerrarPanelFiltros);

  if (limpiarFiltrosMobile) {
    limpiarFiltrosMobile.addEventListener("click", () => {
      limpiarFiltros();
      cerrarPanelFiltros();
    });
  }

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900 && navMenu) navMenu.classList.remove('active');
    });
  });

  let productoSeleccionado = null;
  if (!lista) return;

  function pesos(valor) {
    return valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
  }

  function categoriaSeleccionada() {
    return document.querySelector('input[name="categoria"]:checked')?.value || "Todas";
  }

  function mostrarToast(mensaje) {
    if (toast && toastMensaje) {
      toastMensaje.textContent = mensaje;
      toast.classList.add("visible");
      setTimeout(() => toast.classList.remove("visible"), 3000);
    }
  }

  function crearTarjetaHTML(producto) {
    const srcImagen = obtenerRutaImagen(producto.imagen);
    return `
          <article class="tarjeta-producto">
              <div class="imagen-producto">
                  <img src="${srcImagen}" alt="${producto.nombre}" loading="lazy">
              </div>
              <div class="info-producto">
                  <span class="categoria-producto">${producto.categoria}</span>
                  <h3>${producto.nombre}</h3>
                  <p class="precio-producto">${pesos(producto.precio)}</p>
                  <button type="button" class="boton-producto" data-id="${producto.id}">Agregar al carrito</button>
              </div>
          </article>
      `;
  }

  function crearTarjetaDestacadoHTML(producto) {
    const srcImagen = obtenerRutaImagen(producto.imagen);
    return `
          <article class="tarjeta-destacado" data-id="${producto.id}">
              <img src="${srcImagen}" alt="${producto.nombre}" loading="lazy">
              <div class="overlay-destacado">
                  <h3>${producto.nombre}</h3>
              </div>
          </article>
      `;
  }

  function mostrarProductos(resultados) {
    lista.innerHTML = resultados.map(crearTarjetaHTML).join("");
    if (contador) contador.textContent = `${resultados.length} productos`;
    if (sinProductos) sinProductos.hidden = resultados.length > 0;
    lista.hidden = resultados.length === 0;
  }

  function mostrarDestacados() {
    if (!listaDestacados) return;
    const productosDestacados = productos.filter(p => destacados.includes(p.id));
    listaDestacados.innerHTML = productosDestacados.map(crearTarjetaDestacadoHTML).join("");
  }

  function filtrarProductos() {
    const textoBusqueda = normalizarTexto(buscador.value);
    const palabrasBusqueda = textoBusqueda.split(/\s+/).filter(p => p.length > 0);
    const categoria = categoriaSeleccionada();
    const maximo = Number(precioMaximo.value);

    let resultados = productos.filter((producto) => {
      const nombreNormalizado = normalizarTexto(producto.nombre);
      const coincideNombre = palabrasBusqueda.every(palabra => nombreNormalizado.includes(palabra));
      const coincideCategoria = categoria === "Todas" || producto.categoria === categoria;
      const coincidePrecio = producto.precio <= maximo;
      return coincideNombre && coincideCategoria && coincidePrecio;
    });

    switch (orden.value) {
      case "menor": resultados.sort((a, b) => a.precio - b.precio); break;
      case "mayor": resultados.sort((a, b) => b.precio - a.precio); break;
      case "nombre": resultados.sort((a, b) => a.nombre.localeCompare(b.nombre, "es")); break;
      default: resultados.sort((a, b) => a.id - b.id);
    }

    mostrarProductos(resultados);
  }

  function actualizarPrecio() {
    if (valorPrecio) valorPrecio.textContent = pesos(Number(precioMaximo.value));
    filtrarProductos();
  }

  function limpiarFiltros() {
    buscador.value = "";
    const radioTodas = document.querySelector('input[name="categoria"][value="Todas"]');
    if (radioTodas) radioTodas.checked = true;
    precioMaximo.value = precioMaximo.max;
    orden.value = "destacados";
    actualizarPrecio();
  }

  if (buscador) buscador.addEventListener("input", filtrarProductos);
  if (precioMaximo) precioMaximo.addEventListener("input", actualizarPrecio);
  if (orden) orden.addEventListener("change", filtrarProductos);
  
  document.querySelectorAll('input[name="categoria"]').forEach((radio) => {
    radio.addEventListener("change", filtrarProductos);
  });

  const btnLimpiar = document.getElementById("limpiarFiltros");
  if (btnLimpiar) btnLimpiar.addEventListener("click", limpiarFiltros);
  const btnVerTodos = document.getElementById("verTodos");
  if (btnVerTodos) btnVerTodos.addEventListener("click", limpiarFiltros);

  function abrirModal(evento) {
    const boton = evento.target.closest(".boton-producto, .tarjeta-destacado");
    if (!boton) return;
    
    const id = Number(boton.dataset.id);
    productoSeleccionado = productos.find((item) => item.id === id);
    
    if (productoSeleccionado && modal) {
      modalImg.src = obtenerRutaImagen(productoSeleccionado.imagen);
      modalNombre.textContent = productoSeleccionado.nombre;
      modalPrecio.textContent = pesos(productoSeleccionado.precio);
      document.getElementById("cantidad").value = 1;
      
      const checkboxes = document.querySelectorAll('input[name="preferencia"]');
      checkboxes.forEach(chk => chk.checked = false);
      
      modal.style.display = "flex"; 
    }
  }

  if (lista) lista.addEventListener("click", abrirModal);
  if (listaDestacados) listaDestacados.addEventListener("click", abrirModal);

  if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener("click", () => modal.style.display = "none");
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  if (formPedido) {
    formPedido.addEventListener("submit", (e) => {
      e.preventDefault();
      const cantidad = parseInt(document.getElementById("cantidad").value);
      const checkboxesMarcados = document.querySelectorAll('input[name="preferencia"]:checked');
      
      let preferenciasSeleccionadas = [];
      checkboxesMarcados.forEach((checkbox) => preferenciasSeleccionadas.push(checkbox.value));
      
      const notas = preferenciasSeleccionadas.length > 0 ? preferenciasSeleccionadas.join(", ") : "Normal";
      
      const pedido = {
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        imagen: productoSeleccionado.imagen,
        cantidad: cantidad,
        notas: notas,
        total: productoSeleccionado.precio * cantidad
      };

      let carrito = JSON.parse(localStorage.getItem("carritoNobleAroma")) || [];
      carrito.push(pedido);
      localStorage.setItem("carritoNobleAroma", JSON.stringify(carrito));

      mostrarToast(`¡${pedido.nombre} agregado!`);
      modal.style.display = "none";
    });
  }

  mostrarDestacados();
  actualizarPrecio();
});
