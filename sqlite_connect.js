var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('abcd');

function SqLite(table) {
  this.table = table;
  this.id = 0;
  this.createTables = function () {
    this.createTableFood();
    this.createTableNutrients();
    this.createTableMeasures();
  }

  this.createTableFood = function () {
    var sql = `CREATE TABLE IF NOT EXISTS  food (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, manu text, category text,total text,ndbno text,dateUpdated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);`;
    db.run(sql);
  }

  this.createTableNutrients = function () {
    var sql = `CREATE TABLE IF NOT EXISTS  nutrients (id INTEGER PRIMARY KEY  AUTOINCREMENT, foodid int(11), name VARCHAR(255), nutCategory VARCHAR(255), unit VARCHAR(255), value VARCHAR(255),FOREIGN KEY (foodid) REFERENCES food(id));`;
    db.run(sql);

  }

  this.createTableMeasures = function () {
    var sql = `CREATE TABLE IF NOT EXISTS  measures (id INTEGER PRIMARY KEY AUTOINCREMENT, nutrientsid int(11), label VARCHAR(255), eqv VARCHAR(255), eunit VARCHAR(255),qty VARCHAR(255), value VARCHAR(255),FOREIGN KEY (nutrientsid) REFERENCES nutrients(id));`;
    db.run(sql);
  }
  this.getByName = function (obj,startItem) {
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
  this.getByIdNutrients = function (obj) {
    var queryString = `SELECT * FROM nutrients where foodid like '%${obj.id}%' `;
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
    var queryString = `INSERT INTO ${this.table} (name, manu,category,total,ndbno) VALUES (?, ?, ?, ?, ?)`;
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

  this.addNutrients = function (...params) {
    var queryString = `INSERT INTO nutrients (foodid, name,nutCategory,unit,value) VALUES (?, ?, ?, ?, ?)`;
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

  this.addMeasures = function (...params) {
    var queryString = `INSERT INTO ${this.table} (nutrientsid, label,eqv,eunit,qty,value) VALUES (?, ?, ?, ?, ?, ?)`;
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
