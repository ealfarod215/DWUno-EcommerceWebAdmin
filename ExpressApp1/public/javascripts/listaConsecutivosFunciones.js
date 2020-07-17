document.getElementById("btnRefrescarLista").addEventListener("click", function () {
    //alert("refresco");
    //document.getElementById("busqueda-frm").reset();
    var boton = document.getElementById("btnRefrescarLista");

    boton.setAttribute("formaction", "../listaconsecutivos/listarTodosConsecutivos")
    boton.setAttribute("type", "submit");
});


document.getElementById("btnEliminar").addEventListener("click", function () {
    alert("elimino");
});

