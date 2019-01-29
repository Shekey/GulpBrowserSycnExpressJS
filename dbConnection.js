var mysql = require('mysql');

const databaseOptions = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: "nodeJsDB",
  connectionLimit : 5,
  multipleStatements: true
};

var pool = mysql.createPool(databaseOptions);

module.exports = pool;