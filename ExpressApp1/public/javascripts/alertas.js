const errorRegistro = document.querySelector(".errorR")
const exitoRegistro = document.querySelector(".exitoR")

document.addEventListener('DOMContentLoaded', function () {
    if (errorRegistro.innerHTML.match('Error al realizar el Registro!!!')) {
        errorRegistro.style.padding = "";
        errorRegistro.style.color = "#721c24";
        errorRegistro.style.borderRadius = ".25rem";
        errorRegistro.style.backgroundColor = "#f8d7da";
        errorRegistro.style.border = "1px solid #b33636";


    }
    if (exitoRegistro.innerHTML.match('Exito al realizar el Registro!!!')) {
        exitoRegistro.style.padding = "";
        exitoRegistro.style.color = "#155724";
        exitoRegistro.style.borderRadius = ".25rem";
        exitoRegistro.style.backgroundColor = "#d4edda";
        exitoRegistro.style.border = "1px solid #b33636";
        exitoRegistro.style.marginTop = "25px";

    }
}, false);

