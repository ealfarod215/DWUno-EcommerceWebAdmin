var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('iniciosesion', { title: 'iniciosesion' });
});


router.get('/infoconsecutivo', function(req, res, next) {
    res.render('infoconsecutivo', { title: 'Editar Consecutivos' });
});

router.get('/agregarConsecutivo', function(req, res, next) {
    res.render('agregarConsecutivo', { title: 'Agregar Consecutivos' });
});

router.get('/infolineacomida', function(req, res, next) {
    res.render('infolineacomida', { title: 'infolineacomida' });
});

router.get('/infoprocesador', function (req, res, next) {
    res.render('infoprocesador', { title: 'infoprocesador' });
});
router.get('/infoproductos', function (req, res, next) {
    res.render('infoproductos', { title: 'infoproductos' });
});
router.get('/infotarjetas', function (req, res, next) {
    res.render('infotarjetas', { title: 'infotarjetas' });
});
router.get('/infotiposprecios', function (req, res, next) {
    res.render('infotiposprecios', { title: 'infotiposprecios' });
});
router.get('/infotiquetes', function (req, res, next) {
    res.render('infotiquetes', { title: 'infotiquetes' });
});
router.get('/listaconsecutivos', function (req, res, next) {
    res.render('listaconsecutivos', { title: 'Lista de Consecutivos' });
});
router.get('/listalineacomida', function (req, res, next) {
    res.render('listalineacomida', { title: 'listalineacomida' });
});
router.get('/listaprocesdor', function (req, res, next) {
    res.render('listaprocesdor', { title: 'listaprocesdor' });
});
router.get('/listaproductos', function (req, res, next) {
    res.render('listaproductos', { title: 'listaproductos' });
});

router.get('/listatarjetas', function (req, res, next) {
    res.render('listatarjetas', { title: 'listatarjetas' });
});

router.get('/listatiposprecios', function (req, res, next) {
    res.render('listatiposprecios', { title: 'listatiposprecios' });
});

router.get('/listatiquetes', function (req, res, next) {
    res.render('listatiquetes', { title: 'listatiquetes' });
});

router.get('/listaususario', function (req, res, next) {
    res.render('listaususario', { title: 'listaususario' });
});

router.get('/menuprincipal', function (req, res, next) {
    res.render('menuprincipal', { title: 'Menu Principal' });
});


module.exports = router;
