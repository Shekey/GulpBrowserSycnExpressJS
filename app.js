var express = require('express'),
  app = express();
var path = require('path');
var morgan = require('morgan');
var factory = require('./factory');
var bodyParser = require('body-parser');
var factory = new factory();
var users = factory.create("users");
users.createTableUsers();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(morgan('combined'));
app.use(express.static('./app/dist'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/app/dist/html/index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname + '/app/dist/html/about.html')));
app.get('/users', (req, res) => {
  users.getAll(this).then(function(result) {
  res.send(result);
 })
});

app.post('/api/users', function(req, res) {
  var name = req.body.name;
  var surname = req.body.surname;

  users.add(users,name,surname).then(function(result) {
    res.send(result);
   })
});

app.post('/api/users', function(req, res) {
  var name = req.body.name;
  var surname = req.body.surname;

  users.add(users,name,surname).then(function(result) {
    res.send(result);
   })
});

app.put('/users/', (req, res) => {
  var name = req.body.name;
  var surname = req.body.surname;
  var userId = req.body.id;

  users.update(users,userId,name,surname).then(function(result) {
    res.send(result);
  })
});
app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id
  users.id = userId;

  users.get(users).then(function(result) {
    res.send(result.length<=0?"Sorry, can't find this user":result);
  })
});

app.listen(9001);
module.exports = app;