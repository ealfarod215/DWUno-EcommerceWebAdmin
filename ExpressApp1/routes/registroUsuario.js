var express = require('express');
var router = express.Router();
var db = require('./DBconnection');

router.post('/registrarUsuario', function (req, res, next) {

    var login = req.body.usuario;
    var password = req.body.contrasena;
    var nombreUsuario = req.body.nombre;
    var edadUsuario = req.body.edad;
    var mailUsuario = req.body.email;

    db.query("insert into Usuarios values ('" + login + "','" + password + "','" + nombreUsuario + "','" + edadUsuario + "','" + mailUsuario + "')", function (error, recordset) {
        if (error) {
            console.log("Error al registrar Usuario");
            res.render('registro');
        } else {
            console.log("Usuario Registrado de manera Correcta");
            console.log(recordset);
            //req.flash('errorRegistro', 'Acceso denegado, Credenciales Invalidas !!!');
            res.render('registro', recordset);
        }
    });


});

module.exports = router;