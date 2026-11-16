// J&Y Boutique - interacciones básicas

// 1. Cerrar la barra superior
document.getElementById("cerrarBarra").addEventListener("click", () => {
  document.getElementById("topbar").classList.add("oculta");
});

// 2. Contador del carrito
let total = 0;
const contador = document.getElementById("contadorCarrito");
document.querySelectorAll(".agregar").forEach((boton) => {
  boton.addEventListener("click", () => {
    total++;
    contador.textContent = total;
  });
});

// 3. Favoritos (corazón)
document.querySelectorAll(".fav").forEach((boton) => {
  boton.addEventListener("click", () => {
    boton.classList.toggle("activo");
    boton.textContent = boton.classList.contains("activo") ? "♥" : "♡";
  });
});

// 4. Suscripción
document.getElementById("formSuscripcion").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("¡Gracias por suscribirte a J&Y Boutique! ♡");
  e.target.reset();
});