var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('abcd');

function SqLite(table) {
  this.table = table;
  this.id = 0;
  this.createTableFood = function () {
    var sql = 'CREATE TABLE IF NOT EXISTS  food (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, manu text, category text,dateUpdated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)';
    db.run(sql);
    db.serialize(function () {
      db.get("SELECT * FROM food", function (err, rows) {
      });
    });
  }
  this.getByName = function (obj,startItem) {
    console.log(startItem);
    var queryString = `SELECT * FROM ${this.table} where category like '%${obj.name}%' LIMIT ${startItem},25`;
    return new Promise(function (resolve, reject) {
      db.serialize(function () {
        db.all(queryString, (err, rows, fields) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        })
      });
    })
  }
  this.add = function (...params) {
    var queryString = `INSERT INTO ${this.table} (name, manu,category) VALUES (?, ?, ?)`;
    return new Promise(function (resolve, reject) {
      db.serialize(function () {
        db.run(queryString, params, (err, rows, fields) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        })
      });
    })
  }
  this.getAll = function (obj) {
    var queryString = `SELECT * FROM ${this.table} where category like '%${obj.name}%'`;
    return new Promise(function (resolve, reject) {
      db.serialize(function () {
        db.all(queryString, (err, rows, fields) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        })
      })
    });
  }
}
module.exports = SqLite;
