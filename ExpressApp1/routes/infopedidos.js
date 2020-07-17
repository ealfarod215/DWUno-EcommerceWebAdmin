var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.get('/listarID', function (req, res, next) {
    db.query('SELECT idCliente, nombre AS nomCliente FROM tbCliente', function (error, rows1) {
        db.query('SELECT idPedido FROM tbPedidos', function (error, rows) {
            if (error) {
                console.log('error en el listado');
                return;
            } else {
                console.log(rows);
                res.render('infoPedidos', { title: 'Editar Pedidos', resultado: rows.recordset, cliente: rows1.recordset });
            }
        });  
     });
});


router.post('/editar', function(req, res, next) {
    var idPedido = req.body.idPedido;
    var fechaPedido = req.body.fechaPedido;
    var clientePedido = req.body.clientePedido;

    if (idPedido === "" || fechaPedido == "" || clientePedido == "") {
        console.log("Debe llenar todos los campos");
        req.flash('errorRegistro', 'Error en la operacion!!!');
        res.redirect('/infoPedidos/listarID');
    } else {
        db.query("EXEC spEditarPedidos @idPedido = '" + idPedido + "', @fechaPedido = '" + fechaPedido + "', @clientePedido = '" + clientePedido + "'", function(error, rows) {
            if (error) {
                console.log("wrong");
                req.flash('errorRegistro', 'Error en la operacion!!!');
                res.redirect('/infoPedidos/listarID');
            } else {
                console.log(rows.recordset);
                req.flash('exitoRegistro', 'Exito en la operacion :)');
                res.redirect('/infoPedidos/listarID');
            }
        });
    }

});


module.exports = router;