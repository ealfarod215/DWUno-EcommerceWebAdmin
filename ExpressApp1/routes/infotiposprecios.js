var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.get('/listarID', function (req, res, next) {
    db.query('select idTiposPrecios from tbTiposPrecios', function (error, rows) {
        if (error) {
            console.log('error en el listado');
            return;
        } else {
            console.log(rows);
            res.render('infotiposprecios', { title: 'Agregar o Editar Tipo Precios', resultado: rows.recordset });
        }
    });
});

router.post('/agregar', function (req, res, next) {

    var idNomNewTipoPrecio = req.body.idNomNewTipoPrecio;
    var idDesNueTP = req.body.idDesNueTP;



    if (idNomNewTipoPrecio == "" || idDesNueTP == "") {
        req.flash('errorRegistro', 'Error al realizar el Registro!!!');
        res.redirect('/infotiposprecios/listarID');
    } else {
        db.query("EXEC spInsertarTipoPrecio @nombreTipoPrecio = '" + idNomNewTipoPrecio + "', @descripcionTipoPrecio = '" + idDesNueTP+"'", function (error, recordset) {
            if (error) {
                console.log("error al insertar");
                req.flash('errorRegistro', 'Error al realizar el Registro!!!');
                res.redirect('/infotiposprecios/listarID');
            } else {
                req.flash('exitoRegistro', 'Exito al realizar el Registro!!!');
                res.redirect('/infotiposprecios/listarID');            }
        });
    }


});

router.post('/editar', function (req, res, next) {
    var idTipoPrecio = req.body.idConsecutivo;
    var idNomNewTipoPrecio = req.body.idNomNewTipoPrecio;
    var idDesNueTP = req.body.idDesNueTP;
  

    if (idTipoPrecio === "" || idDesNueTP == "" || idNomNewTipoPrecio == "") {
        console.log("Debe llenar todos los campos");
        req.flash('errorRegistro', 'Error en la operacion!!!');
        res.redirect('/infotiposprecios/listarID');
    } else {
        db.query("EXEC spEditarTipoPrecio @idTiposPrecio = '"+idTipoPrecio+"', @nombreTipoPrecio = '"+idNomNewTipoPrecio+"',  @descripcionTipoPrecio = '"+idDesNueTP+"'", function (error, rows) {
            if (error) {
                console.log("wrong");
                req.flash('errorRegistro', 'Error en la operacion!!!');
                res.redirect('/infotiposprecios/listarID');
            } else {
                console.log(rows.recordset);
                req.flash('exitoRegistro', 'Exito en la operacion :)');
                res.redirect('/infotiposprecios/listarID');
            }
        });
    }

});



module.exports = router;