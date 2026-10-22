
const formulario = document.getElementById("formInscripcion");
const resumen = document.getElementById("resumen");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const documento = document.getElementById("documento").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const programa = document.getElementById("programa");
    const nombrePrograma = programa.options[programa.selectedIndex].text;
    const jornada = document.querySelector(
        'input[name="jornada"]:checked'
    ).value;

    resumen.innerHTML = `
        <h2>Resumen de inscripción</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Documento:</strong> ${documento}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Celular:</strong> ${telefono}</p>
        <p><strong>Programa:</strong> ${nombrePrograma}</p>
        <p><strong>Jornada:</strong> ${jornada}</p>
        <p><strong>Autorización de datos:</strong> Aceptada</p>
    `;
});
