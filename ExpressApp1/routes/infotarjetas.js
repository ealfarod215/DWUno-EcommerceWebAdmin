var express = require('express');
var router = express.Router();
var db = require('./PagosDBconnection');

router.get('/listarID', function (req, res, next) {
    db.query('select idTiposTarjetas, nombre as nomTT from tbTiposTarjetas', function (error, rows) {
        if (error) {
            console.log('error en el listado');
            res.render('infotarjetas', { title: 'Agregar o Editar Tipo Tarjetas', resultado: rows.recordset });
        } else {
            console.log(rows);
            res.render('infotarjetas', { title: 'Agregar o Editar Tipo Tarjetas', resultado: rows.recordset });
        }
    });
});

router.post('/agregar', function (req, res, next) {

    var nomTT = req.body.nomTT;
    var desTT = req.body.desTT;



    if (nomTT == "" || desTT == "") {
        req.flash('errorRegistro', 'Error al realizar el Registro!!!');
        res.redirect('/infotarjetas/listarID');
    } else {
        db.query("EXEC spInsertarTipoTarjeta @nombreTiposTarjeta = '" + nomTT + "', @descripcionTiposTarjeta = '" + desTT+"'", function (error, recordset) {
            if (error) {
                console.log("error al insertar");
                req.flash('errorRegistro', 'Error al realizar el Registro!!!');
                res.redirect('/infotarjetas/listarID');
            } else {
                req.flash('exitoRegistro', 'Exito al realizar el Registro!!!');
                res.redirect('/infotarjetas/listarID');
            }
        });
    }


});

router.post('/editar', function (req, res, next) {
    var idTT = req.body.idTT;
    var nomTT = req.body.nomTT;
    var desTT = req.body.desTT;


    if (idTT === "" || desTT == "" || nomTT == "") {
        console.log("Debe llenar todos los campos");
        req.flash('errorRegistro', 'Error en la operacion!!!');
        res.redirect('/infotarjetas/listarID');
    } else {
        db.query("EXEC spEditarTipoTarjeta @idTiposTarjeta = '"+idTT+"', @nombreTiposTarjeta = '"+nomTT+"', @descripcionTiposTarjeat = '"+desTT+"'", function (error, rows) {
            if (error) {
                console.log("wrong");
                req.flash('errorRegistro', 'Error en la operacion!!!');
                res.redirect('/infotarjetas/listarID');
            } else {
                console.log(rows.recordset);
                req.flash('exitoRegistro', 'Exito en la operacion :)');
                res.redirect('/infotarjetas/listarID');
            }
        });
    }

});



module.exports = router;