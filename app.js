var express = require('express'),
  app = express();
var path = require('path');
var morgan = require('morgan');
var factory = require('./factory');
var factory = new factory();
var users = factory.create("users");

app.use(morgan('combined'));
app.use(express.static('./app/dist'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/app/dist/html/index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname + '/app/dist/html/about.html')));
app.get('/users', (req, res) => {
  users.getAll(this).then(function(result) {
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