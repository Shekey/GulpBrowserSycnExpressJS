
var obj = require('./mysql_connect');
function Factory() {

  this.create = function(name) {
      return new obj(name);
  };

  this.getAll = function(obj) {
    obj.getAll().then(function(result) {
     return result;
    }, function(err) {
      console.log(err);
    })
  };

  this.get = function(obj) {
    obj.get(obj).then(function(result) {
      return result;
    }, function(err) {
      console.log(err);
    })
  };
}

module.exports = Factory;
