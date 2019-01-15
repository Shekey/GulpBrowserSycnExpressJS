var express = require('express'), 
    app = express();
var path = require('path');
    app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/app/index.html')))
    app.get('/about', (req, res) => res.sendFile(path.join(__dirname + '/app/about.html')))

app.listen(9001);  
module.exports = app;