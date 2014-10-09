var express = require('express');
var app     = express();
var port    = 8080;

app.get('/getStarscream', function(req, res) {
    res.send('this is a sample! ProjectName: ' + req.query.projectname);
});

app.listen(port);
console.log('Server running on port: ' + port);