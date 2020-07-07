var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.post('/confirmarCredenciales', function (req, res, next) {
    var login = req.body.inputEmail;
    var password = req.body.inputPassword;


    db.query("select count(*) as respuesta from tbUsuarios where loginUsuario = '"+login+"' and passwordUsuario = '"+password+"'", function (error, recordset) {
        if (error) {
            console.log("wrong");
            return;
        } else if (recordset.recordset[0]['respuesta'] == 1) {
            console.log("permisos concedidos");
            res.render('menuprincipal');
        } else {
            console.log("permisos denegados");
            console.log(recordset);
            //req.flash('errorRegistro', 'Acceso denegado, Credenciales Invalidas !!!');
            res.render('iniciosesion', recordset);
        }
    });


});

module.exports = router;