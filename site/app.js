var fortune = require('./lib/fortune.js')
var express = require ('express');
var app = express();

//set up handlebars view engine
var handlebars = require('express-handlebars')
		.create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// var fortunes = [
// 		"Conquer your fears or they will conquer you.",
// 		"Rivers need springs",
// 		"Do not fear what you don't know",
// 		"you will have a pleasant serprise",
// 		"Whenever possible, keep it simple",
// ];

// routes
app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	// var randomFortune = 
	// 		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: fortune.getFortune()});
});


// 404 catch-all handler (middlewares)
app.use(function (req, res, next) {
 	res.status(404);
	res.render('404');
});

// 500 error handler (middlewares)
app.use(function (err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' +
		app.get('port') + '; press Ctrl-c to terminate');
});