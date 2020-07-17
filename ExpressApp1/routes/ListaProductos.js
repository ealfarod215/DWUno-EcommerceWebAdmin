var express = require('express');
var router = express.Router();
var db = require('./DBconnection');
var select = 'EXEC MostrarProducto';

router.get('/mostrarProducto', function (req, res, next) {
    db.query(select, function (err, rows) {
        if (err) throw err;
        console.table(rows.recordset);
        res.render('ListaProductos', { Producto: rows.recordset });
    });
});

module.exports = router;