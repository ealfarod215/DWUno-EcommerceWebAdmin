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
            res.render('menuprincipal', { title: "Menu Principal"});
        } else {
            console.log("permisos denegados");
            console.log(recordset);
            //req.flash('errorRegistro', 'Acceso denegado, Credenciales Invalidas !!!');
            res.render('iniciosesion', recordset);
        }
    });


});

router.post('/agregarUsuario', function (req, res, next) {
    var nombre = req.body.nombre;
    var email = req.body.email;
    var password = req.body.password;
    var password1 = req.body.password1;
    var preguntaSeguridad = req.body.preguntaSeguridad;
    var repuestaSeguridad = req.body.repuestaSeguridad;
    var rol = req.body.rol;

    db.query('select COUNT(*) as respuesta from tbUsuarios', function (error, recordset) {
        if (error) {
            console.log("wrong");
            return;
        } else if (recordset.recordset[0]['respuesta'] > 0) {
            console.log("insertando usuario...");
            var numId = recordset.recordset[0]['respuesta'];
            var usuarioId = numId + 1;
            var id = 'USR-' + usuarioId;

            db.query('select COUNT(*) as pregunta from tbPreguntasSeguridad', function (error, recordset) {
                if (error) {
                    console.log("wrong");
                    return;
                } else {
                    console.log("insertando pregunta...");
                    var numId1 = recordset.recordset[0]['pregunta'];
                    var preguntaId = numId1 + 1;
                    var id1 = 'P-' + preguntaId;
                    db.query("EXEC agregarPregunta @idPregunta = '" + id1 + "', @pregunta = '" + preguntaSeguridad + "'", function (error, rows) {
                        if (error) {
                            console.error(error);
                            res.render('iniciosesion', { mensaje: 'Error al agregar la informaci?n' });
                        } else {
                            console.table(rows.recordset);
                            db.query("EXEC IngresarUsuario @idUsuario = '" + id + "', @loginUsuario = '" + nombre + "', @passwordUsuario = '" + password + "', @email = '" + email + "', @preguntaSeguridad = '" + id1 + "', @respuestaSeguridad = '" + preguntaSeguridad + "', @estado = 'Activo', @rol = '" + rol + "'", function (error, rows) {
                                if (error) {
                                    console.log(error);
                                    console.log(preguntaSeguridad);
                                    console.log("Error");
                                    console.log(usuarioId);
                                    res.render('iniciosesion', { mensaje: 'Error al agregar la informaci?n' });
                                } else {
                                    console.table(rows.recordset);
                                    res.render('iniciosesion', { mensaje: 'Se agreg? la informaci?n' });
                                }
                            });
                        }
                    })
                }
            })
        } else {
            console.log("permisos denegados");
            console.log(recordset);
        }
    });
});

module.exports = router;