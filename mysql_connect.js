var pool = require('./dbConnection');
function MySql(table) {
  this.table = table;
  this.id = 0;
  this.name = '';

  this.createTableUsers = function() {
    var sql = `CREATE TABLE IF NOT EXISTS ${this.table} (id int(11) NOT NULL auto_increment, name VARCHAR(255), manu VARCHAR(255), category VARCHAR(255), PRIMARY KEY  (id))`
    pool.query(sql, function (err, result) {
    if (err) throw err;
    });
  }

  this.getAll = function() {
    var queryString = "SELECT * FROM users";
    return new Promise(function(resolve, reject) {
      pool.query(queryString, (err, rows, fields) => {
        if(err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }
  this.getById = function(obj) {
      var queryString = `SELECT * FROM ${this.table} where id = ${obj.id}`;
      return new Promise(function(resolve, reject) {
        pool.query(queryString, (err, rows, fields) => {
          if(err) {
            reject(err);
          }
          resolve(rows);
        })
      })
  }
  this.getByName = function(obj) {
    var queryString = `SELECT * FROM ${this.table} where category like '%${obj.name}%'`;
    return new Promise(function(resolve, reject) {
      pool.query(queryString, (err, rows, fields) => {
        if(err) {
          reject(err);
        }
        resolve(rows);
      })
    })
}

  this.add = function(...params) {
    var queryString =  `INSERT INTO ${this.table} (name, manu,category) VALUES (?, ?, ?)`;
    console.log(params);
    return new Promise(function(resolve, reject) {
      pool.query(queryString,params, (err, rows, fields) => {
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
    let manu = params[1];
    let category = params[2];
    var queryString =  `UPDATE ${this.table} SET name = "${name}", category = "${category}", manu = "${manu}" WHERE id = "${id}"`;

    return new Promise(function(resolve, reject) {
      pool.query(queryString, (err, rows, fields) => {
        if(err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }
}

module.exports = MySql;
