const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
});

mysqlConnection.connect(function(err) {
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is connect');
    }
})

module.exports = mysqlConnection;