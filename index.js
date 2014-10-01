var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
];

app.get('/', function(req,res) {
    res.render('home');
});

app.get('/about', function(req,res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
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
    console.log("Ekspress startet på port" + app.get('port'))
});
