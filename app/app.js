'use strict';
var express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');
var PeerServer = require('peer').PeerServer;
var routes = require('./routes');
// creating a PeerJS server at port 9000
var pserver = new PeerServer({
	port: 9000,
	path: ''
});
var app = express();
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
// getting port for expressJS server 3000
// process.env.PORT for heroku
app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), function () {
	console.log('Server Created');
});

module.exports = app;
