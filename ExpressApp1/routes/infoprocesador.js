var express = require('express');
var router = express.Router();
var db = require('./PagosDBconnection');

router.get('/listarID', function (req, res, next) {
    db.query('select idTipoProcesadorPago as idTPP, tipo as nomTPP from tbTipoProcesadorPago', function (error1, rows1) {
        db.query('select idPrecesadoresDePago as idPP, nombre as nomPP from tbProcesadoresDePagos', function (error, rows) {
            if (error) {
                console.log('error en el listado');
                res.render('infoprocesador', { title: 'Agregar o Editar Metodo de Pago', resultado: rows.recordset, tipoPago : rows1.recordset });
            } else {
                console.log(rows);
                res.render('infoprocesador', { title: 'Agregar o Editar Metodo de Pago', resultado: rows.recordset, tipoPago: rows1.recordset });
            }
        });
    });
    
});

router.post('/agregar', function (req, res, next) {

    var nomProcesoPago = req.body.nomPP; 
    var nomOpcionPago = req.body.nomOPP;
    var tipo = req.body.idTPP;
    var estadoProcesoPago = req.body.estPP;
    var reqVerificacion = req.body.reqVerificacion;
    var metodo = req.body.metodo;



    if (nomProcesoPago == "" || nomOpcionPago == "" || tipo == "" || estadoProcesoPago == "" || reqVerificacion == "" || metodo == "") {
        req.flash('errorRegistro', 'Error al realizar el Registro!!!');
        res.redirect('/infoprocesador/listarID');
    } else {
        db.query("EXEC spInsertarProcesoPago @nomProcesoPago = '"+nomProcesoPago+"', @nomOpcionPago = '"+nomOpcionPago+"', @tipo = '"+tipo+"', @estadoProcesoPago = '"+estadoProcesoPago+"', @reqVerificacion = '"+reqVerificacion+"', @metodo = '"+metodo+"'", function (error, recordset) {
            if (error) {
                console.log("error al insertar");
                req.flash('errorRegistro', 'Error al realizar el Registro!!!');
                res.redirect('/infoprocesador/listarID');
            } else {
                req.flash('exitoRegistro', 'Exito al realizar el Registro!!!');
                res.redirect('/infoprocesador/listarID');
            }
        });
    }


});

router.post('/editar', function (req, res, next) {
    var idPP = req.body.idPP;
    var nomProcesoPago = req.body.nomPP;
    var nomOpcionPago = req.body.nomOPP;
    var tipo = req.body.idTPP;
    var estadoProcesoPago = req.body.estPP;
    var reqVerificacion = req.body.reqVerificacion;
    var metodo = req.body.metodo;


    if (idPP === "" || nomProcesoPago == "" || nomOpcionPago == "" || tipo == "" || estadoProcesoPago == "" || reqVerificacion == "" || metodo == "") {
        console.log("Debe llenar todos los campos");
        req.flash('errorRegistro', 'Error en la operacion!!!');
        res.redirect('/infoprocesador/listarID');
    } else {
        db.query("spEditarProcesoPago @idProcesoPago = '"+idPP+"', @nomProcesoPago = '"+nomProcesoPago+"', @nomOpcionPago = '"+nomOpcionPago+"', @tipo = '"+tipo+"', @estadoProcesoPago = '"+estadoProcesoPago+"', @reqVerificacion = '"+reqVerificacion+"', @metodo = '"+metodo+"'", function (error, rows) {
            if (error) {
                console.log("wrong");
                req.flash('errorRegistro', 'Error en la operacion!!!');
                res.redirect('/infoprocesador/listarID');
            } else {
                console.log(rows.recordset);
                req.flash('exitoRegistro', 'Exito en la operacion :)');
                res.redirect('/infoprocesador/listarID');
            }
        });
    }

});



module.exports = router;