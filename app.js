
var factory = require('./factory');
var app = require('./routes');
var factory = new factory();
var users = factory.create("users");
users.createTableUsers();
