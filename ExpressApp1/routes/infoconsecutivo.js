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
            res.render('infoconsecutivo', { title: 'Editar Consecutivos', resultado: rows.recordset });
        }
    });
});


router.post('/editar', function (req, res, next) {
    var idConsecutivo = req.body.idConsecutivo;
    var descripcionConsecutivo = req.body.desConsecutivo;
    var valorConsecutivo = req.body.valorConsecutivo;
    var poseePrefijo = req.body.poseePrefijo;
    var prefijoConsecutivo = req.body.prefijo1;

    if (idConsecutivo == "" || descripcionConsecutivo == "" || valorConsecutivo == "" || poseePrefijo == "" || poseePrefijo != "Si" || poseePrefijo != "No" || prefijoConsecutivo == "") {
        console.log("Debe llenar todos los campos");
        res.render('infoconsecutivo', { title: 'Editar Consecutivos', mensaje: 'Debe llenar toda la Informacion!!!' });
    } else {
        db.query("EXEC spEditarConsecutivo @idConsecutivo = '"+idConsecutivo+"', @valorConsecutivo = '"+valorConsecutivo+"', @descripcionConsecutivo = '"+descripcionConsecutivo+"', @poseePrefijo = '"+poseePrefijo+"', @prefijoConsecutivo = '"+prefijoConsecutivo+"'", function (error, rows) {
            if (error) {
                console.log("wrong");
                res.render('infoconsecutivo', { title: 'Editar Consecutivos', mensaje: 'Error al Editar la Informacion!!!' });
            } else {
                console.log(rows.recordset);
                res.render('infoconsecutivo', { title: 'Editar Consecutivos', mensaje: 'Exito en la operacion :)' });
            }
        });
    }

});


module.exports = router;