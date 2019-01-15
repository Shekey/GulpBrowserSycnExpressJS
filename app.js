var express = require('express'), 
    app = express();
var path = require('path');
    app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/app/dist/html/index.html')))
    app.get('/about', (req, res) => res.sendFile(path.join(__dirname + '/app/dist/html/about.html')))

app.listen(9001);  
module.exports = app;