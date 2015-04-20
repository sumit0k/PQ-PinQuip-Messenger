'use strict';
//loading all required libraries
var express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	PouchDB = require('pouchdb'),
	routes = require('./routes'),
	//initialising the app
	app = express(),
	//PouchDB = require('pouchdb'),
	upload = require('jquery-file-upload-middleware');
upload.configure({
	uploadDir: __dirname + '/public/uploads',
	uploadUrl: '/uploads',
	ssl: false,
	maxPostsize: 110000000,
	minFileSize: 1,
	maxFileSize: 100000000,
	imageVersions: {
		thumbnail: {
			width: 50,
			height: 50
		}
	}
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/// Redirect all to home except post
app.get('/upload', function (req, res) {
	res.redirect('/');
});

app.put('/upload', function (req, res) {
	res.redirect('/');
});

app.delete('/upload', function (req, res) {
	res.redirect('/');
});

app.use('/upload', function (req, res, next) {
	upload.fileHandler({
		uploadDir: function () {
			return __dirname + '/public/uploads/';
		},
		uploadUrl: function () {
			return '/uploads';
		}
	})(req, res, next);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var InMemPouchDB = PouchDB.defaults({
	db: require('sqldown'),
	prefix: '/tmp/my-temp-pouch/'
});
app.use('/db', require('express-pouchdb')(InMemPouchDB));
//creating a database file for handling all the databases
//doubt in whether to use single database and multiple tables or multiple database with relevant tables
//app.use('/db', require('express-pouchdb')(PouchDB));
//var dbDetails = new PouchDB('dbDetails', { db: require('leveldown-prebuilt') }),
//	dbMessages = new PouchDB('dbMessages', { db: require('leveldown-prebuilt') });
// getting port for expressJS server 3000
// process.env.PORT for heroku
app.set('port', process.env.PORT || 3000);
app.get('/', routes.index);
var server = require('http').createServer(app, function () {
	console.log('Server variable');
});
server.listen(app.get('port'), function () {
	console.log('Server Created');
});


module.exports = app;
