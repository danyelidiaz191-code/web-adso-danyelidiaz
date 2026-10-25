// Formulario de contacto - Papelería
const form = document.getElementById("formContacto");

// Desactivamos los globos nativos del navegador para mostrar nuestros mensajes,
// pero la validación sigue usando los atributos del HTML (required, pattern, etc.).
form.noValidate = true;

const campos = form.querySelectorAll("input, select, textarea");

// Crea un <small class="error"> debajo de cada campo
campos.forEach((campo) => {
    const error = document.createElement("small");
    error.className = "error";
    error.id = "error-" + campo.id;
    error.setAttribute("aria-live", "polite");
    campo.insertAdjacentElement("afterend", error);
    campo.setAttribute("aria-describedby", error.id);
});

// Devuelve el texto del error de un campo ("" si es válido)
function obtenerMensaje(campo) {
    const v = campo.validity;

    if (v.valueMissing) {
        return "Este campo es obligatorio.";
    }
    if (v.typeMismatch && campo.type === "email") {
        return "Escribe un correo válido, por ejemplo nombre@correo.com.";
    }
    if (v.tooShort) {
        return `Escribe al menos ${campo.minLength} caracteres.`;
    }
    if (v.patternMismatch) {
        return campo.title || "El formato no es válido.";
    }
    return "";
}

// Muestra u oculta el error de un campo. Devuelve true si es válido.
function validarCampo(campo) {
    const mensaje = obtenerMensaje(campo);
    const error = document.getElementById("error-" + campo.id);

    error.textContent = mensaje;
    campo.classList.toggle("invalido", mensaje !== "");
    campo.setAttribute("aria-invalid", mensaje !== "");

    return mensaje === "";
}

// Validación en vivo: al salir del campo y mientras corrige
campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarCampo(campo));
    campo.addEventListener("input", () => {
        if (campo.classList.contains("invalido")) {
            validarCampo(campo);
        }
    });
});

// Sección donde mostramos el resumen tras enviar
const resumen = document.createElement("section");
resumen.id = "resumen";
resumen.setAttribute("aria-live", "polite");
form.insertAdjacentElement("afterend", resumen);

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let primerInvalido = null;

    campos.forEach((campo) => {
        const esValido = validarCampo(campo);
        if (!esValido && !primerInvalido) {
            primerInvalido = campo;
        }
    });

    if (primerInvalido) {
        primerInvalido.focus();
        resumen.innerHTML = "";
        return;
    }

    const datos = new FormData(form);
    const motivoTexto = form.motivo.options[form.motivo.selectedIndex].text;

    resumen.innerHTML = "";

    const titulo = document.createElement("h3");
    titulo.textContent = "¡Mensaje enviado! ✅";

    const lista = document.createElement("ul");
    const filas = [
        ["Nombre", datos.get("nombre")],
        ["Correo", datos.get("correo")],
        ["Celular", datos.get("telefono") || "No indicado"],
        ["Motivo", motivoTexto],
        ["Mensaje", datos.get("mensaje")],
    ];

    filas.forEach(([etiqueta, valor]) => {
        const li = document.createElement("li");
        const negrita = document.createElement("strong");
        negrita.textContent = etiqueta + ": ";
        li.append(negrita, valor); // textContent evita inyectar HTML
        lista.appendChild(li);
    });

    resumen.append(titulo, lista);

    form.reset();
    campos.forEach((campo) => {
        campo.classList.remove("invalido");
        campo.removeAttribute("aria-invalid");
    });
});