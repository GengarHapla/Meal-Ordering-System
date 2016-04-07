var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var serveStatic = require('serve-static');
var cors = require('cors');

var enableCORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

app.use(enableCORS);

// viewed at http://localhost:4000
app.get('/', function (req, res) {
    res.sendFile('./index.html', { root: __dirname });
});

var serve = serveStatic('./', {
    'index': false
})
app.use(serve);

http.listen(4000, function () {
    console.log('listening on *:4000');
});
