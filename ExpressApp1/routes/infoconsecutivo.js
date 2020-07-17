var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.get('/listarID', function(req, res, next) {
    db.query('SELECT idConsecutivo FROM tbConsecutivos', function(error, rows) {
        if (error) {
            console.log('error en el listado');
            return;
        } else {
            console.log(rows);
            res.render('infoconsecutivo', { title: 'Editar Consecutivos', resultado: rows.recordset });
        }
    });
});


router.post('/editar', function(req, res, next) {
    var idConsecutivo = req.body.idConsecutivo;
    var descripcionConsecutivo = req.body.desConsecutivo;
    var valorConsecutivo = req.body.valorConsecutivo;
    var poseePrefijo = req.body.poseePrefijo;
    var prefijoConsecutivo = req.body.prefijo1;

    if (idConsecutivo === "" || descripcionConsecutivo == "" || valorConsecutivo == "" || poseePrefijo == "" || prefijoConsecutivo == "") {
        console.log("Debe llenar todos los campos");
        req.flash('errorRegistro', 'Error en la operacion!!!');
        res.redirect('infoconsecutivo/listarID');
    } else {
        db.query("EXEC spEditarConsecutivo @idConsecutivo = '" + idConsecutivo + "', @valorConsecutivo = '" + valorConsecutivo + "', @descripcionConsecutivo = '" + descripcionConsecutivo + "', @poseePrefijo = '" + poseePrefijo + "', @prefijoConsecutivo = '" + prefijoConsecutivo + "'", function(error, rows) {
            if (error) {
                console.log("wrong");
                req.flash('errorRegistro', 'Error en la operacion!!!');
                res.redirect('infoconsecutivo/listarID');
            } else {
                console.log(rows.recordset);
                req.flash('exitoRegistro', 'Exito en la operacion :)');
                res.redirect('/infoconsecutivo/listarID');
            }
        });
    }

});


module.exports = router;