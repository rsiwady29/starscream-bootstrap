var express = require('express');
var gzippo = require('gzippo');
var morgan  = require('morgan');

var app     = express();
var port    = 8080;

// Serving files!
app.use(morgan({ format: 'dev', immediate: true }));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// API
app.get('/getStarscream', function(req, res) {
    res.send('this is a sample! ProjectName: ' + req.query.projectname);
});

app.listen(port);
console.log('Server running on port: ' + port);