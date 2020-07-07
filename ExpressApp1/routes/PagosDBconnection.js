var sql = require("mssql/msnodesqlv8");

var dbConfig = {
    database: "dbEfoodMetodosPago",
    server: "localhost",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
}

var conn = new sql.ConnectionPool(dbConfig);


conn.connect(function (err) {
    if (err) {
        console.dir("wrong");
    }
    else {
        console.dir("Se ha conectado a la base de datos");
    }
});

module.exports = conn;