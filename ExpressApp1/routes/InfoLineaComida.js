var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.post('/agregarLineaComida', function (req, res, next) {
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;

    if (nombre == "" || descripcion == "") {
        console.log("Debe de completar todos los campos.");
        res.render('InfoLineaComida', { mensaje: 'Debe de completar todos los campos' });
    } else {
        db.query("EXEC IngresarLineaComida @nombre = '" + nombre + "', @descripcion = '" + descripcion + "'", function (error, rows) {
            if (error) {
                console.error("Error");
                res.render('InfoLineaComida', { mensaje: 'Error al editar la información' });
            } else {
                console.table(rows.recordset);
                res.render('InfoLineaComida', { mensaje: 'Se editó la información' });
            }
        });
    }
})

router.post('/editarLineaComida', function (req, res, next) {
    var codigo = req.body.codigoLineaComida;
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;

    if (codigo == "" || nombre == "" || descripcion == "") {
        console.log("Debe de completar todos los campos.");
        res.render('InfoLineaComida', { mensaje: 'Debe de completar todos los campos' });
    } else {
        db.query("EXEC ActualizarLineaComida @idLineaDeComida = '" + codigo + "', @nombre = '" + nombre + "', @descripcion = '" + descripcion + "'", function (error, rows) {
            if (error) {
                console.error("Error");
                res.render('InfoLineaComida', { mensaje: 'Error al editar la información' });
            } else {
                console.table(rows.recordset);
                res.render('InfoLineaComida', { mensaje: 'Se editó la información' });
            }
        });
    }
});

router.post('/eliminarLineaComida', function (req, res, next) {
    var codigo = req.body.codigoLineaComida;

    if (codigo == "") {
        console.log("Debe de completar el código para eliminar.");
        res.render('InfoLineaComida', { mensaje: 'Debe de completar el código para eliminar.' });
    } else {
        db.query("EXEC EliminarLineaComida @idLineaDeComida = '" + codigo + "'", function (error, recordset) {
            if (error) {
                console.log(error);
                res.render('InfoLineaComida', { mensaje: 'Error al eliminar la información \nCódigo: ' + codigo + '.' });
            } else {
                console.log(recordset.recordset);
                res.render('InfoLineaComida', { mensaje: 'Información eliminada \nCódigo: ' + codigo + '.'  });
            }
        });
    }
});

module.exports = router;