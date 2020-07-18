var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.get('/listarID', function (req, res, next) {
    db.query('select idTiqueteDescuento from tbTiquetesDeDescuento', function (error, rows) {
        if (error) {
            console.log('error en el listado');
            return;
        } else {
            console.log(rows);
            res.render('infotiquetes', { title: 'Agregar o Editar Tipo tiquetes', resultado: rows.recordset });
        }
    });
});

router.post('/agregar', function (req, res, next) {

    var idTiqueteAgregar = req.body.idTiqueteAgregar;
    var descripcion = req.body.descripcionTiqueteDeDescuento;
    var disponibles = req.body.disponiblesTiqueteDeDescuento;
    var descuento = req.body.descuentoTiqueteDeDescuento;


    if (idTiqueteAgregar == "" || descripcion == "" || disponibles == "" || descuento == "") {
        req.flash('errorRegistro', 'Error al realizar el Registrop!!!');
        res.redirect('/infotiquetes/listarID');
    } else {
        db.query("exec spInsertarTiquetesDeDescuento @idTiqueteDeDescuento = '"+idTiqueteAgregar+"', @descripcionTiqueteDeDescuento='"+descripcion+"',@disponiblesTiqueteDeDescuento ='"+disponibles+"', @descuentoTiqueteDeDescuento ='"+descuento+"'", function (error, recordset) {
            if (error) {
                console.log("error al insertar");
                req.flash('errorRegistro', 'Error al realizar el Registro!!!');
                res.redirect('/infotiquetes/listarID');
            } else {
                req.flash('exitoRegistro', 'Exito al realizar el Registro!!!');
                res.redirect('/infotiquetes/listarID');
            }
        });
    }
    console.log(idTiqueteAgregar +  descripcion +
     disponibles+ descripcion
    )

});

router.post('/editar', function (req, res, next) {
    var idTiquete = req.body.idTiqueteDeDescuento;
    var descripcion = req.body.descripcionTiqueteDeDescuento;
    var disponibles = req.body.disponiblesTiqueteDeDescuento;
    var descuento = req.body.descuentoTiqueteDeDescuento;

    if (idTiquete == "" || descripcion == "" || disponibles == "" || descuento == "") {
        console.log("Debe llenar todos los campos");
        req.flash('errorRegistro', 'Error en la operacion!!!');
        res.redirect('/infotiquetes/listarID');
    } else {
        db.query("exec spEditarTiquetesDeDescuento @idTiqueteDeDescuento = '"+idTiquete+"', @descripcionTiqueteDeDescuento = '"+descripcion+"',@disponiblesTiqueteDeDescuento='"+disponibles+"', @descuentoTiqueteDeDescuento='"+descuento+"'", function (error, rows) {
            if (error) {
                console.log("wrong");
                req.flash('errorRegistro', 'Error en la operacion!!!');
                res.redirect('/infotiquetes/listarID');
            } else {
                console.log(rows.recordset);
                req.flash('exitoRegistro', 'Exito en la operacion :)');
                res.redirect('/infotiquetes/listarID');
            }
        });
    }

});



module.exports = router;