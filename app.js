var express = require('express');
var promise = require('bluebird');
var app = express();

var options =  {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp('postgres://localhost:5432/instapics');

app.get("/users",function(req,res, next){
	db.any('SELECT * FROM users')
	.then(function(data){
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieves ALL users'
		});
	})
	.catch(function(err){
		return next(err);
	});
});

app.post("/users",function(req,res){

});









app.listen(3000);