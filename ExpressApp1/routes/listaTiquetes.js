var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.get('/listarTodosTiquetes', function (req, res, next) {
    db.query('EXEC spListarTodosTiquetesDeDescuento', function (error, rows) {
        if (error) {
            console.log('error en el listado');
            return;
        } else {
            console.log(rows);
            res.render('listatiquetes', { title: 'Lista de tiquetes', resultado: rows.recordset });
        }
    });
});


router.post('/filtrarListaTiquetes', function (req, res, next) {
    var idTiqueteDeDescuento = req.body.inputBusqueda;


    if (idTiqueteDeDescuento == "") {
        console.log("Debe llenar todos los campos");
        res.render('listatiquetes', { mensaje: 'Debe llenar toda la Informacion!!!' });
    } else {
        db.query("EXEC spFiltrarTiquetesDeDescuento @idTiqueteDeDescuento = '" + idTiqueteDeDescuento + "'", function (error, rows) {
            if (error) {
                console.log("wrong");
                res.render('listatiquetes', { mensaje: 'Error al Filtrar la Informacion!!!' });
            } else {
                console.log(rows.recordset);
                res.render('listatiquetes', { title: 'Lista de Tiquetes', resultado: rows.recordset });
            }
        });
    }

});

router.post('/eliminarRegistro', function (req, res, next) {
    var idTiqueteDeDescuento = req.body.inputBusqueda;

    if (idTiqueteDeDescuento == "") {
        console.log("Debe llenar todos los campos");
        res.render('listatiquetes', { mensaje: 'Debe llenar toda la Informacion!!!' });

    } else {
        db.query("EXEC spEliminarTiquetesDeDescuento @idTiqueteDeDescuento = '" + idTiqueteDeDescuento + "'", function (error, recordset) {
            if (error) {
                console.log("wrong");
                res.render('listatiquetes', { mensaje: 'Error al Eliminar la Informacion!!!', title: 'Lista de Tiquetes' });

            } else {
                console.log(recordset.recordset);
                res.render('listatiquetes', { mensaje: 'Se elimino de manera Exitosa', title: 'Lista de Tiquetes' });
            }
        });
    }

});


module.exports = router;