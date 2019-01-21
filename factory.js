
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

  this.add = function(obj,...params) {
    obj.add(obj,params).then(function(result) {
      return result;
    }, function(err) {
      console.log(err);
    })
  };

  this.update = function(obj,id,...params) {
    obj.add(obj,id,params).then(function(result) {
      return result;
    }, function(err) {
      console.log(err);
    })
  };
}

module.exports = Factory;
