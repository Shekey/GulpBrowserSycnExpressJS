var pool = require('./dbConnection');
function MySql(table) {
  this.table = table;
  this.id = 0;
  this.name = '';

  this.createTableFood = function() {
    var sql = `CREATE TABLE IF NOT EXISTS food (id int(11) NOT NULL auto_increment, name VARCHAR(255), manu VARCHAR(255), category VARCHAR(255), total VARCHAR(255), ndbno VARCHAR(255),dateUpdated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (id));
    CREATE TABLE IF NOT EXISTS nutrients (id int(11) NOT NULL auto_increment, foodid int(11), name VARCHAR(255), nutCategory VARCHAR(255), unit VARCHAR(255), value VARCHAR(255), PRIMARY KEY  (id),FOREIGN KEY (foodid) REFERENCES food(id));
    CREATE TABLE IF NOT EXISTS measures (id int(11) NOT NULL auto_increment,nutrientsid int(11), label VARCHAR(255), eqv VARCHAR(255), eunit VARCHAR(255),qty VARCHAR(255), value VARCHAR(255),PRIMARY KEY(id),FOREIGN KEY (nutrientsid) REFERENCES nutrients(id));`
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
  this.getByName = function(obj,startItem) {
    var queryString = `SELECT * FROM ${this.table} where category like '%${obj.name}%' LIMIT ${startItem},25`;
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
    var queryString =  `INSERT INTO ${this.table} (name, manu,category,total,ndbno) VALUES (?, ?, ?, ?, ?)`;
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
    let ndbno = params[3];
    let CURRENT_TIMESTAMP = new Date.now();
    console.log(CURRENT_TIMESTAMP);
    let category = params[2];
    var queryString =  `UPDATE ${this.table} SET name = "${name}", category = "${category}", manu = "${manu}",ndbno = "${ndbno}",dateUpdated = ${CURRENT_TIMESTAMP} WHERE id = "${id}"`;

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
