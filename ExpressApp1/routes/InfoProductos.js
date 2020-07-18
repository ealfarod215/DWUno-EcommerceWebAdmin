var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.post('/agregarProducto', function (req, res, next) {
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;
    var linea = req.body.codigoLineaComida;
    var contenido = req.body.contenido;

    if (nombre == "" || descripcion == "" || linea == "" || contenido == "") {
        console.log("Debe de completar todos los campos.");
        res.render('InfoProductos', { mensaje: 'Debe de completar todos los campos' });
    } else {
        db.query("EXEC IngresarProducto @nombre = '"+nombre+"', @descripcion = '"+descripcion+"', @linea = '"+linea+"', @contenido = '"+contenido+"' ", function (error, rows) {
            if (error) {
                console.error("Error");
                res.render('InfoProductos', { mensaje: 'Error al agregar la informaci�n' });
            } else {
                console.table(rows.recordset);
                res.render('InfoProductos', { mensaje: 'Se agreg� la informaci�n' });
            }
        });
    }
});

router.post('/editarProducto', function (req, res, next) {
    var codigo = req.body.codigoProducto;
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;
    var linea = req.body.codigoLineaComida;
    var contenido = req.body.contenido;

    if (codigo == "" || nombre == "" || descripcion == "" || linea == "" || contenido == "") {
        console.log("Debe de completar todos los campos.");
        res.render('InfoProductos', { mensaje: 'Debe de completar todos los campos' });
    } else {
        db.query("EXEC ActualizarProductos @idProductos = '" + codigo + "', @nombre = '" + nombre + "', @descripcion = '" + descripcion + "', @linea = '" + linea + ", @contenido = '" + contenido + "'", function (error, rows) {
            if (error) {
                console.error("Error");
                res.render('InfoProductos', { mensaje: 'Error al editar la informaci�n' });
            } else {
                console.table(rows.recordset);
                res.render('InfoProductos', { mensaje: 'Se edit� la informaci�n' });
            }
        });
    }
});

router.post('/eliminarProducto', function (req, res, next) {
    var codigo = req.body.codigoProducto;

    if (codigo == "") {
        console.log("Debe de completar el c�digo para eliminar.");
        res.render('InfoProductos', { mensaje: 'Debe de completar el c�digo para eliminar.' });
    } else {
        db.query("EXEC EliminarProductos @idProductos = '" + codigo + "'", function (error, recordset) {
            if (error) {
                console.log(error);
                res.render('InfoProductos', { mensaje: 'Error al eliminar la informaci�n \nC�digo: ' + codigo + '.' });
            } else {
                console.log(recordset.recordset);
                res.render('InfoProductos', { mensaje: 'Informaci�n eliminada \nC�digo: ' + codigo + '.' });
            }
        });
    }
});

module.exports = router;