'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var hbs = require('hbs');

var indexRouter = require('./routes/index');
var ingresoAlSistema = require("./routes/IngresoAlSistema");
var listaconsecutivosRoutes = require("./routes/listaconsecutivos");
var infoconsecutivoRoutes = require("./routes/infoconsecutivo");
var agregarConsecutivoRoutes = require("./routes/agregarConsecutivo");
var listaPedidosRoutes = require("./routes/listaPedidos");
var infoPedidosRoutes = require("./routes/infopedidos");
var agregarPedidoRoutes = require("./routes/agregarPedido");
var listaTiquetesRoutes = require("./routes/listaTiquetes");
var infoTiquetesRoutes = require("./routes/infotiquetes");

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use('/', indexRouter);
app.use('/ingresoAlSistema', ingresoAlSistema);
app.use('/listaconsecutivos', listaconsecutivosRoutes);
app.use('/infoconsecutivo', infoconsecutivoRoutes);
app.use('/agregarConsecutivo', agregarConsecutivoRoutes);
app.use('/listaPedidos', listaPedidosRoutes);
app.use('/infoPedidos', infoPedidosRoutes);
app.use('/agregarPedido', agregarPedidoRoutes);
app.use('/listaTiquetes', listaTiquetesRoutes);
app.use('/infotiquetes', infoTiquetesRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});