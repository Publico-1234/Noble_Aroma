document.addEventListener("DOMContentLoaded", () => {
  const panelCarrito = document.getElementById("panel-carrito");
  const overlayCarrito = document.getElementById("overlay-carrito");
  const cerrarPanel = document.getElementById("cerrar-panel");

  document.addEventListener("click", (e) => {
    const btnAbrir = e.target.closest("#btn-abrir-carrito-global, #btn-abrir-carrito-centro");
    if (btnAbrir) {
      e.preventDefault();
      const panel = document.getElementById("panel-carrito");
      const overlay = document.getElementById("overlay-carrito");
      if (panel && overlay) {
        renderizarCarritoPanel();
        panel.classList.add("active");
        overlay.classList.add("active");
      }
    }
  });

  if (cerrarPanel) {
    cerrarPanel.addEventListener("click", () => {
      if (panelCarrito) panelCarrito.classList.remove("active");
      if (overlayCarrito) overlayCarrito.classList.remove("active");
    });
  }

  if (overlayCarrito) {
    overlayCarrito.addEventListener("click", () => {
      if (panelCarrito) panelCarrito.classList.remove("active");
      overlayCarrito.classList.remove("active");
    });
  }

function ajustarRutaImagen(ruta) {
  if (!ruta) return "";
  const rutaLimpia = ruta.replace(/^(\.\.\/|\/)/, "");
  return `/Noble_Aroma/${rutaLimpia}`;
}

  function renderizarCarritoPanel() {
    const lista = document.getElementById("lista-carrito");
    const carritoVacio = document.getElementById("carrito-vacio");
    const resumen = document.getElementById("resumen-carrito");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total-final");

    if (!lista) return;

    let carrito = JSON.parse(localStorage.getItem("carritoNobleAroma")) || [];

    if (carrito.length === 0) {
      lista.innerHTML = "";
      if (carritoVacio) carritoVacio.hidden = false;
      if (resumen) resumen.hidden = true;
      return;
    }

    if (carritoVacio) carritoVacio.hidden = true;
    if (resumen) resumen.hidden = false;

    const pesos = (valor) => valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

    lista.innerHTML = carrito.map((item, index) => `
      <div class="item-carrito">
        <img src="${ajustarRutaImagen(item.imagen)}" alt="${item.nombre}">
        <div class="item-info">
          <h3>${item.nombre}</h3>
          <p class="item-notas">${item.notas || ""}</p>
          <p class="item-precio">${pesos(item.precio)}</p>
        </div>
        <div class="item-acciones">
          <div class="controles-cantidad">
            <button class="btn-cantidad" data-index="${index}" data-action="restar">-</button>
            <span>${item.cantidad}</span>
            <button class="btn-cantidad" data-index="${index}" data-action="sumar">+</button>
          </div>
          <p class="item-total">${pesos(item.total)}</p>
          <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        </div>
      </div>
    `).join("");

    const total = carrito.reduce((sum, item) => sum + (item.total || 0), 0);
    if (subtotalEl) subtotalEl.textContent = pesos(total);
    if (totalEl) totalEl.textContent = pesos(total);

    lista.querySelectorAll('.btn-cantidad').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        const action = e.target.dataset.action;
        let carritoData = JSON.parse(localStorage.getItem("carritoNobleAroma")) || [];

        if (action === 'sumar') carritoData[index].cantidad += 1;
        if (action === 'restar' && carritoData[index].cantidad > 1) carritoData[index].cantidad -= 1;

        carritoData[index].total = carritoData[index].precio * carritoData[index].cantidad;
        localStorage.setItem("carritoNobleAroma", JSON.stringify(carritoData));
        renderizarCarritoPanel();
      });
    });

    lista.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        let carritoData = JSON.parse(localStorage.getItem("carritoNobleAroma")) || [];
        carritoData.splice(index, 1);
        localStorage.setItem("carritoNobleAroma", JSON.stringify(carritoData));
        renderizarCarritoPanel();
      });
    });
  }

  const modalCheckout = document.getElementById("modal-checkout");
  const cerrarCheckout = document.getElementById("cerrar-checkout");
  const formCheckout = document.getElementById("form-checkout");
  const btnPagar = document.getElementById("btn-pagar");
  const btnVaciar = document.getElementById("btn-vaciar");

  if (btnPagar && modalCheckout) {
    btnPagar.addEventListener("click", () => modalCheckout.style.display = "flex");
  }

  if (cerrarCheckout && modalCheckout) {
    cerrarCheckout.addEventListener("click", () => modalCheckout.style.display = "none");
  }

  if (modalCheckout) {
    modalCheckout.addEventListener("click", (e) => {
      if (e.target === modalCheckout) modalCheckout.style.display = "none";
    });
  }

  if (formCheckout) {
    formCheckout.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombreInput = document.getElementById("checkout-nombre");
      const nombre = nombreInput ? nombreInput.value : "Cliente";
      if (modalCheckout) modalCheckout.style.display = "none";

      const toast = document.createElement("div");
      toast.className = "toast-notificacion visible";
      toast.innerHTML = `<p>Pedido confirmado para ${nombre}. ¡Gracias por tu compra!</p>`;
      document.body.appendChild(toast);

      setTimeout(() => {
        localStorage.removeItem("carritoNobleAroma");
        const esSubcarpeta = window.location.pathname.includes("/html/");
        window.location.href = esSubcarpeta ? "../index.html" : "index.html";
      }, 3000);
    });
  }

  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        localStorage.removeItem("carritoNobleAroma");
        renderizarCarritoPanel();
      }
    });
  }

  renderizarCarritoPanel();
});
