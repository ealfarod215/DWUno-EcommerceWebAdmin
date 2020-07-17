var express = require('express');
var router = express.Router();
var db = require('./DBconnection');


router.get('/listarID', function (req, res, next) {
    db.query('SELECT idCliente, nombre AS nomCliente FROM tbCliente', function (error, rows) {

        if (error) {
            console.log('error en el listado');
            return;
        } else {
            console.log(rows);
            res.render('agregarPedido', { title: 'Agregar Pedidos', cliente: rows.recordset});
        }
    });
});


router.post('/agregar', function(req, res, next) {


    var fechaPedido = req.body.fechaPedido;
    var clientePedido = req.body.clientePedido;


    if (fechaPedido == "" || clientePedido == "") {
        req.flash('errorRegistro', 'Error al realizar el Registro!!!');
        res.redirect('/agregarPedido/listarID');
    } else {
        db.query("EXEC spInsertarPedido @fechaPedido = '" + fechaPedido + "', @clientePedido = '" + clientePedido + "'", function(error, recordset) {
            if (error) {
                console.log("error al insertar");
                req.flash('errorRegistro', 'Error al realizar el Registro!!!');
                res.redirect('/agregarPedido/listarID');
            } else {
                req.flash('exitoRegistro', 'Exito al realizar el Registro!!!');
                res.redirect('/agregarPedido/listarID');
            }
        });
    }


});



module.exports = router;