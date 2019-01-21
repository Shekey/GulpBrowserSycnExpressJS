var dbOptions = require('../mysql_connect.js');
var connection = dbOptions.db;

var db = {
 table: this.table,
 getRows : function() {
  var queryString = "SELECT * FROM "+this.table;
  connection.query(queryString, (err, rows, fields) => {
    console.log("I think we fetched something");
    return rows;
  });
 }
}

module.exports = {db: db};
