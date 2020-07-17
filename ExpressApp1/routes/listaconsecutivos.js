var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.get('/listarTodosConsecutivos', function (req, res, next) {
    db.query('EXEC spListarTodosConsecutivos', function (error, rows) {
        if (error) {
            console.log('error en el listado');
            return;
        } else {
            console.log(rows);
            res.render('listaconsecutivos', { title: 'Lista de Consecutivos', resultado: rows.recordset} );
        }
    });
});

router.post('/filtrarLista', function (req, res, next) {
    var prefijo = req.body.inputBusqueda;
    

    if (prefijo == "" ) {
        console.log("Debe llenar todos los campos");
        res.render('listaconsecutivos', { mensaje: 'Debe llenar toda la Informacion!!!' });
    } else {
        db.query("EXEC spFiltrarConsecutivoPorPrefijo @prefijo = '"+prefijo+"'", function (error, rows) {
            if (error) {
                console.log("wrong");
                res.render('listaconsecutivos', { mensaje: 'Error al Filtrar la Informacion!!!' });
            } else {
                console.log(rows.recordset);
                res.render('listaconsecutivos', { title: 'Lista de Consecutivos', resultado: rows.recordset });
            }
        });
    }

});

router.post('/eliminarRestRegistro', function (req, res, next) {
    var prefijo = req.body.inputBusqueda;

    if (prefijo == "") {
        console.log("Debe llenar todos los campos");
        res.render('listaconsecutivos', { mensaje: 'Debe llenar toda la Informacion!!!' });

    } else {
        db.query("EXEC spEliminarConsecutivo @prefijo = '"+prefijo+"'", function (error, recordset) {
            if (error) {
                console.log("wrong");
                res.render('listaconsecutivos', { mensaje: 'Error al Eliminar la Informacion!!!' });

            } else {
                console.log(recordset.recordset);
                res.render('listaconsecutivos', { title: 'Lista de Consecutivos', mensaje: 'Se elimino de manera Exitosa' });
            }
        });
    }

});




module.exports = router;