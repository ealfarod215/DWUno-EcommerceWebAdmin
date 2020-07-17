var express = require('express');
var router = express.Router();
var db = require('./DBconnection');


router.get('/listarTodosTipoPrecio', function (req, res, next) {
    db.query('EXEC spListarTodosTipoPrecio', function (error, rows) {
        if (error) {
            console.log('error en el listado');
            return;
        } else {
            console.log(rows);
            res.render('listatiposprecios', { title: 'Lista de Tipo Precios', resultado: rows.recordset });
        }
    });
});


router.post('/filtrarLista', function (req, res, next) {
    var idTiposPrecio = req.body.inputBusqueda;


    if (idTiposPrecio == "") {
        console.log("Debe llenar todos los campos");
        res.render('listatiposprecios', { mensaje: 'Debe llenar toda la Informacion!!!' });
    } else {
        db.query("EXEC spFiltrarTipoPrecioPorId @idTiposPrecio = '"+idTiposPrecio+"'", function (error, rows) {
            if (error) {
                console.log("wrong");
                res.render('listatiposprecios', { title: 'Lista de Tipo Precios', mensaje: 'Error al Filtrar la Informacion!!!' });
            } else {
                console.log(rows.recordset);
                res.render('listatiposprecios', { title: 'Lista de Tipo Precios', resultado: rows.recordset });
            }
        });
    }

});

router.post('/eliminarRestRegistro', function (req, res, next) {
    var idTiposPrecio = req.body.inputBusqueda;

    if (idTiposPrecio == "") {
        console.log("Debe llenar todos los campos");
        res.render('listatiposprecios', { title: 'Lista de Tipo Precios', mensaje: 'Debe llenar toda la Informacion!!!' });

    } else {
        db.query("EXEC spEliminarTipoPrecio @idTiposPrecio = '"+idTiposPrecio+"'", function (error, recordset) {
            if (error) {
                console.log("wrong");
                res.render('listatiposprecios', { title: 'Lista de Tipo Precios', mensaje: 'Error al Eliminar la Informacion!!!' });

            } else {
                console.log(recordset.recordset);
                res.render('listatiposprecios', { title: 'Lista de Tipo Precios', mensaje: 'Se elimino de manera Exitosa' });
            }
        });
    }

});

module.exports = router;