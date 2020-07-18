var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.get('/listarTodosPedidos', function (req, res, next) {
    db.query('EXEC spListarTodosPedidos', function (error, rows) {
        if (error) {
            console.log('error en el listado');
            return;
        } else {
            console.log(rows);
            res.render('listaPedidos', { title: 'Lista de Pedidos', resultado: rows.recordset });
        }
    });
});


router.post('/filtrarListaPedidos', function (req, res, next) {
    var idPedido = req.body.inputBusqueda;


    if (idPedido == "") {
        console.log("Debe llenar todos los campos");
        res.render('listaPedidos', { mensaje: 'Debe llenar toda la Informacion!!!' });
    } else {
        db.query("EXEC spFiltrarPedidoPorId @idPedido = '" + idPedido + "'", function (error, rows) {
            if (error) {
                console.log("wrong");
                res.render('listaPedidos', { mensaje: 'Error al Filtrar la Informacion!!!' });
            } else {
                console.log(rows.recordset);
                res.render('listaPedidos', { title: 'Lista de Pedidos', resultado: rows.recordset });
            }
        });
    }

});

router.post('/eliminarRegistro', function (req, res, next) {
    var idPedido = req.body.inputBusqueda;

    if (idPedido == "") {
        console.log("Debe llenar todos los campos");
        res.render('listaPedidos', { mensaje: 'Debe llenar toda la Informacion!!!' });

    } else {
        db.query("EXEC spEliminarPedidos @idPedido = '" + idPedido + "'", function (error, recordset) {
            if (error) {
                console.log("wrong");
                res.render('listaPedidos', { mensaje: 'Error al Eliminar la Informacion!!!', title: 'Lista de Pedidos'});

            } else {
                console.log(recordset.recordset);
                res.render('listaPedidos', { mensaje: 'Se elimino de manera Exitosa', title: 'Lista de Pedidos'});
            }
        });
    }

});


module.exports = router;