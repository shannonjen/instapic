var express = require('express');
var promise = require('bluebird');
var path = require('path');

var app = express();

var options =  {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp('postgres://localhost:5432/instapics');

app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));

app.get('/users',function(req,res,next){
	db.any('SELECT * FROM users')
	.then(function(data){
		res.render('index',{ data: data });
	})
	.catch(function(err){
		return next(err);
	});
});

app.get('/users/:id', function(req,res,next){
	var userId = req.params.id;
	db.one('SELECT * FROM users WHERE id = $1', userId)
     .then(function (data) {
       res.render('show', {username:data.username} );
		 })
		 .catch(function(err){
		 	return next(err);
		 });
});

app.post("/users",function(req,res){
	res.response("req.body.username");
});


app.listen(3000);