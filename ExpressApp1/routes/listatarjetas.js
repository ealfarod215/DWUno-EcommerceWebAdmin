var express = require('express');
var router = express.Router();
var db = require('./PagosDBconnection');


router.get('/listarTodo', function (req, res, next) {
    db.query('EXEC spListarTodosTipoTarjeta', function (error, rows) {
        if (error) {
            console.log('error en el listado');
            res.render('listatarjetas', { title: 'Lista de Tipo Tarjetas', mensaje: "Error al cargar la lista" });
        } else {
            console.log(rows);
            res.render('listatarjetas', { title: 'Lista de Tipo Tarjetas', resultado: rows.recordset });
        }
    });
});


router.post('/filtrarLista', function (req, res, next) {
    var idTipoTarjeta = req.body.inputBusqueda;


    if (idTipoTarjeta == "") {
        console.log("Debe llenar todos los campos");
        res.render('listatarjetas', { mensaje: 'Debe llenar toda la Informacion!!!' });
    } else {
        db.query("EXEC spFiltrarTipoTarjetaPorId @idTiposTarjeta = '"+idTipoTarjeta+"'", function (error, rows) {
            if (error) {
                console.log("wrong");
                res.render('listatarjetas', { title: 'Lista de Tipo Tarjetas', mensaje: 'Error al Filtrar la Informacion!!!' });
            } else {
                console.log(rows.recordset);
                res.render('listatarjetas', { title: 'Lista de Tipo Tarjetas', resultado: rows.recordset });
            }
        });
    }

});

router.post('/eliminarRestRegistro', function (req, res, next) {
    var idTipoTarjeta = req.body.inputBusqueda;

    if (idTipoTarjeta == "") {
        console.log("Debe llenar todos los campos");
        res.render('listatarjetas', { title: 'Lista de Tipo Tarjetas', mensaje: 'Debe llenar toda la Informacion!!!' });

    } else {
        db.query("EXEC spEliminarTipoTarjeta @idTiposTarjeta = '"+idTipoTarjeta+"'", function (error, recordset) {
            if (error) {
                console.log("wrong");
                res.render('listatarjetas', { title: 'Lista de Tipo Tarjetas', mensaje: 'Error al Eliminar la Informacion!!!' });

            } else {
                console.log(recordset.recordset);
                res.render('listatarjetas', { title: 'Lista de Tipo Tarjetas', mensaje: 'Se elimino de manera Exitosa' });
            }
        });
    }

});

module.exports = router;