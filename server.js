var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var serveStatic = require('serve-static');

// viewed at http://localhost:4000
app.get('/', function (req, res) {
    res.sendFile('./index.html', { root: __dirname });
});

var serve = serveStatic('./', {
    'index': false
});
app.use(serve);

http.listen(4000, function () {
    console.log('listening on *:4000');
});
