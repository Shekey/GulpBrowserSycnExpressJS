var express = require('express'),
  app = express();
var morgan = require('morgan');
var factory = require('./factory');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var data = require('./getDataAPI');
var users = data.db;
nunjucks.configure('./app/dist/html', {
  autoescape: true,
  express: app
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(morgan('combined'));
app.use(express.static('./app/dist'))
app.get('/', (req, res) => res.render('index.njk'));
app.get('/test', (req, res) => {
  data.get().then(function (result) {
    res.render('table.njk',{ list: result })
    // res.json(result)
  })
});
app.post('/test/submit', (req, res) => {
  var query = req.body.query;
  data.get(query).then(function (result) {
    res.render('table.njk',{ list: result })
    // res.json(result)
  })
});
app.get('/about', (req, res) => res.render('about.njk'));
app.get('/api/users', (req, res) => {
  users.getAll(this).then(function (result) {
    res.send(result);
  })
});
app.get('/test', (req, res) => {data.get().then(function (result) {
  console.log(result);
  res.render('table.njk',{ list: result })})});
app.post('/test', (req, res) => {
  var query = req.body.query;
  var currentPage = req.body.currentPage;
  console.log(currentPage);
  data.get(query,25,currentPage).then(function (result) {
    res.json(result);
  })
});
app.post('/api/users', function (req, res) {
  var name = req.body.name;
  var surname = req.body.surname;

  users.add(users, name, surname).then(function (result) {
    res.send(result);
  })
});
app.post('/api/users', function (req, res) {
  var name = req.body.name;
  var surname = req.body.surname;

  users.add(users, name, surname).then(function (result) {
    res.send(result);
  })
});
app.put('/api/users/', (req, res) => {
  var name = req.body.name;
  var surname = req.body.surname;
  var userId = req.body.id;

  users.update(users, userId, name, surname).then(function (result) {
    res.send(result);
  })
});
app.get('/api/users/:id', (req, res) => {
  console.log(req.params.id);
  const userId = req.params.id
  users.id = userId;

  users.getById(users).then(function (result) {
    res.send(result.length <= 0 ? "Sorry, can't find this user" : result);
  })
});

app.listen(9001);
module.exports = app;