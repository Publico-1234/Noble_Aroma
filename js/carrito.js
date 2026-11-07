document.addEventListener("DOMContentLoaded", () => {
  function obtenerRutaImagen(ruta) {
    if (!ruta) return "";
    const isSubfolder = window.location.pathname.includes("/html/");
    const rutaLimpia = ruta.replace(/^(\.\.\/|\/)/, "");
    return isSubfolder ? `../${rutaLimpia}` : rutaLimpia;
  }

  function pesos(valor) {
    return (valor || 0).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
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

    lista.innerHTML = carrito.map((item, index) => `
      <div class="item-carrito">
        <img src="${obtenerRutaImagen(item.imagen)}" alt="${item.nombre}">
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

  document.addEventListener("click", (e) => {
    const btnAbrir = e.target.closest("#btn-abrir-carrito-global, #btn-abrir-carrito-centro, #Carro");
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

    if (e.target.closest("#cerrar-panel") || e.target.id === "overlay-carrito") {
      const panel = document.getElementById("panel-carrito");
      const overlay = document.getElementById("overlay-carrito");
      if (panel) panel.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
    }

    if (e.target.id === "btn-pagar") {
      const modalCheckout = document.getElementById("modal-checkout");
      if (modalCheckout) modalCheckout.style.display = "flex";
    }

    if (e.target.id === "cerrar-checkout" || e.target.id === "modal-checkout") {
      const modalCheckout = document.getElementById("modal-checkout");
      if (modalCheckout) modalCheckout.style.display = "none";
    }
  });

  window.addEventListener("carritoActualizado", renderizarCarritoPanel);

  const formCheckout = document.getElementById("form-checkout");
  if (formCheckout) {
    formCheckout.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombreInput = document.getElementById("checkout-nombre");
      const nombre = nombreInput ? nombreInput.value : "Cliente";
      const modalCheckout = document.getElementById("modal-checkout");
      if (modalCheckout) modalCheckout.style.display = "none";

      const toast = document.createElement("div");
      toast.className = "toast-notificacion visible";
      toast.innerHTML = `<p>Pedido confirmado para ${nombre}. ¡Gracias por tu compra!</p>`;
      document.body.appendChild(toast);

      setTimeout(() => {
        localStorage.removeItem("carritoNobleAroma");
        renderizarCarritoPanel();
        const isSubfolder = window.location.pathname.includes("/html/");
        window.location.href = isSubfolder ? "../index.html" : "index.html";
      }, 3000);
    });
  }

  const btnVaciar = document.getElementById("btn-vaciar");
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
