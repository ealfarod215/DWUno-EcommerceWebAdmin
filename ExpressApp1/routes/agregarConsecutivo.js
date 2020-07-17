var express = require('express');
var router = express.Router();
var db = require('./DBconnection');


router.post('/agregar', function (req, res, next) {

    var valorConsecutivo = req.body.valorConsecutivo;
    var descripcionConsecutivo = req.body.desConsecutivo;
    var poseePrefijo = req.body.poseePrefijo;
    var prefijoConsecutivo = req.body.prefijo1;

    

    if (valorConsecutivo == "" || descripcionConsecutivo == "" || poseePrefijo == "" || prefijoConsecutivo == "") {
        req.flash('errorRegistro', 'Error al realizar el Registro!!!');
        res.render('agregarConsecutivo');
    } else {
        db.query("EXEC spInsertarConsecutivo @valorConsecutivo = '" + valorConsecutivo + "', @descripcionConsecutivo = '" + descripcionConsecutivo + "', @poseePrefijo = '" + poseePrefijo + "', @prefijoConsecutivo = '" + prefijoConsecutivo + "'", function (error, recordset) {
            if (error) {
                console.log("error al insertar");
                req.flash('errorRegistro', 'Error al realizar el Registro!!!');
                res.render('agregarConsecutivo');
            } else {
                req.flash('exitoRegistro', 'Exito al realizar el Registro!!!');
                res.render('agregarConsecutivo');
            }
        });
    }


});



module.exports = router;