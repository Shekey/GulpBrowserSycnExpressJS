const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

function SqLite(table) {
  this.table = table;
  this.id = 0;
  this.getAll = function() {
    var queryString = `SELECT * FROM ${this.table}`;
    return new Promise(function(resolve, reject) {
      db.query(queryString, (err, rows, fields) => {
        if(err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }
}
module.exports = SqLite;
