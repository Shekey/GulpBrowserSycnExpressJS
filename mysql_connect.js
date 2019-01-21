var mysql = require('mysql');

const databaseOptions = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: "nodeJsDB"
};

function MySql(table) {
  this.table = table;
  this.id = 0;
  this.getAll = function() {
    var queryString = "SELECT * FROM users";
    return new Promise(function(resolve, reject) {
      mysql.createConnection(databaseOptions).query(queryString, (err, rows, fields) => {
        if(err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }

  this.get = function(obj) {
      var queryString = `SELECT * FROM ${this.table} where id = ${obj.id}`;
      return new Promise(function(resolve, reject) {
        mysql.createConnection(databaseOptions).query(queryString, (err, rows, fields) => {
          if(err) {
            reject(err);
          }
          resolve(rows);
        })
      })
  }
}

module.exports = MySql;
