var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.post('/editarLineaComida', function (req, res, next) {
    var codigo = req.body.codigoLineaComida;
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;

    if (codigo == "" || nombre == "" || descripcion == "") {
        console.log("Debe de completar todos los campos.");
        res.render('LineaComida', { mensaje: 'Debe de completar todos los campos' });
    } else {
        db.query("EXEC ActualizarLineaComida @idLineaComida = '" + codigo + "', @nombre = '" + nombre + "', @descripcion = '" + descripcion + "'", function (error, rows) {
            if (error) {
                console.error("Error");
                res.render('LineaComida', { mensaje: 'Error al editar la información' });
            } else {
                console.table(rows.recordset);
                res.render('LineaComida', { LineaComida: rows.recordset });
            }
        });
    }
});