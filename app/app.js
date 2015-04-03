'use strict';
//loading all required libraries
var express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	PouchDB = require('pouchdb'),
	routes = require('./routes'),
	//initialising the app
	app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var server = require('http').createServer(app, function () {
	console.log('Server variable');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);
//creating a database file for handling all the databases
//doubt in whether to use single database and multiple tables or multiple database with relevant tables
app.use('/database', require('express-pouchdb')(PouchDB));
// getting port for expressJS server 3000
// process.env.PORT for heroku
app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), function () {
	console.log('Server Created');
});

module.exports = app;
