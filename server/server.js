var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static content
app.use(express.static(__dirname + '/client'));

//angular SPA
app.get('/', function(req, res) {
  res.render('index');
});


app.listen(process.env.PORT || 8000);
