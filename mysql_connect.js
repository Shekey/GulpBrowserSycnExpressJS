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

  this.createTableUsers = function() {
    var sql = `CREATE TABLE IF NOT EXISTS ${this.table} (id int(11) NOT NULL auto_increment, name VARCHAR(255), surname VARCHAR(255),PRIMARY KEY  (id))`;
    mysql.createConnection(databaseOptions).query(sql, function (err, result) {
    if (err) throw err;
    });
  }

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

  this.add = function(obj,...params) {
    var queryString =  `INSERT INTO ${this.table} (name, surname) VALUES (?, ?)`;
    console.log(params);
    return new Promise(function(resolve, reject) {
      mysql.createConnection(databaseOptions).query(queryString,params, (err, rows, fields) => {
        if(err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }

  this.update = function(obj,id,...params) {
    console.log(id);
    console.log(params);
    let name = params[0];
    let surname = params[1];
    var queryString =  `UPDATE ${this.table} SET name = "${name}", surname = "${surname}" WHERE id = "${id}"`;
    // var queryString =  `UPDATE ${this.table} SET name = "Ajdin", surname = "SAHINBEGIVUICCCA" WHERE id = 1`;

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
