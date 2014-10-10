var express = require('express');
var gzippo = require('gzippo');
var morgan  = require('morgan');

var projectGenerator = require('./generator');

var app     = express();
var port    = process.env.PORT || 8080;

// Local environment
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Serving files!
app.use(morgan({ format: 'dev', immediate: true }));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// API
app.get('/getStarscream', function(req, res) {
    var projectname = req.query.projectname;

    projectGenerator.generate(projectname, res);
});

app.listen(port);
console.log('Server running on port: ' + port);