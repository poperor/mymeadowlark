var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var fortune = require('./lib/fortune.js');

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', function(req,res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req,res) {
    res.render('tours/hood-river');
});

app.get('/tours/oregon-coast', function(req,res) {
    res.render('tours/oregon-coast');
});

app.get('/tours/request-group-rate', function(req,res) {
    res.render('tours/request-group-rate');
});

app.get('/about/contact', function(req,res) {
    res.type('text/plain');
    res.send('Contact my meadowlark travel');
});

// custom 404 page
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function(err, req, res) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log("Ekspress startet på port" + app.get('port'));
});
