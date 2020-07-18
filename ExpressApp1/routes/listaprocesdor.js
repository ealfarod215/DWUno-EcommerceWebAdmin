var express = require('express');
var router = express.Router();
var db = require('./PagosDBconnection');


router.get('/listarTodo', function (req, res, next) {
    db.query('EXEC spListarProcesoPago', function (error, rows) {
        if (error) {
            console.log('error en el listado');
            res.render('listaprocesdor', { title: 'Lista Procesos de Pago', mensaje: "Error al cargar la lista" });
        } else {
            console.log(rows);
            res.render('listaprocesdor', { title: 'Lista Procesos de Pago', resultado: rows.recordset });
        }
    });
});


router.post('/filtrarLista', function (req, res, next) {
    var idProcesoPago = req.body.inputBusqueda;


    if (idProcesoPago == "") {
        console.log("Debe llenar todos los campos");
        res.render('listaprocesdor', { mensaje: 'Debe llenar toda la Informacion!!!' });
    } else {
        db.query("EXEC spFiltrarProcesoPagoPorId @idProcesoPago = '"+idProcesoPago+"'", function (error, rows) {
            if (error) {
                console.log("wrong");
                res.render('listaprocesdor', { title: 'Lista Procesos de Pago', mensaje: 'Error al Filtrar la Informacion!!!' });
            } else {
                console.log(rows.recordset);
                res.render('listaprocesdor', { title: 'Lista Procesos de Pago', resultado: rows.recordset });
            }
        });
    }

});

router.post('/eliminarRestRegistro', function (req, res, next) {
    var idProcesoPago = req.body.inputBusqueda;

    if (idProcesoPago == "") {
        console.log("Debe llenar todos los campos");
        res.render('listaprocesdor', { title: 'Lista Procesos de Pago', mensaje: 'Debe llenar toda la Informacion!!!' });

    } else {
        db.query("EXEC spEliminarProcesoPago @idProcesoPago = '"+idProcesoPago+"'", function (error, recordset) {
            if (error) {
                console.log("wrong");
                res.render('listaprocesdor', { title: 'Lista Procesos de Pago', mensaje: 'Error al Eliminar la Informacion!!!' });

            } else {
                console.log(recordset.recordset);
                res.render('listaprocesdor', { title: 'Lista Procesos de Pago', mensaje: 'Se elimino de manera Exitosa' });
            }
        });
    }

});

module.exports = router;