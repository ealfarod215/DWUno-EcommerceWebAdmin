var express = require('express');
var router = express.Router();
var db = require('./DBconnection');
var select = 'EXEC MostrarLineaComida';

router.get('/mostrarLineaComida', function (req, res, next) {
    db.query(select, function (err, rows) {
        if (err) throw err;
        console.table(rows.recordset);
        res.render('ListaLineaComida', { LineaComida: rows.recordset });
    });
});

module.exports = router;