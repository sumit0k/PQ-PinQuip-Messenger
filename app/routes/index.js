//var app = require('../app.js'),
//	options = app.options;

/* GET home page. */
exports.index = function (req, res) {
	res.render('index');
};
// // angular page
// exports.angular = function (req, res) {
// 	res.render('angularjs');
// };
//files loading
//exports.files = function (req, res) {
// res.setHeader(
// 	'Access-Control-Allow-Origin',
// 	options.accessControl.allowOrigin
// );
// res.setHeader(
// 	'Access-Control-Allow-Methods',
// 	options.accessControl.allowMethods
// );
// res.setHeader(
// 	'Access-Control-Allow-Headers',
// 	options.accessControl.allowHeaders
// );
// var handleResult = function (result, redirect) {
// 		if (redirect) {
// 			res.writeHead(302, {
// 				'Location': redirect.replace(
// 					/%s/,
// 					encodeURIComponent(JSON.stringify(result))
// 				)
// 			});
// 			res.end();
// 		} else {
// 			res.writeHead(200, {
// 				'Content-Type': req.headers.accept
// 					.indexOf('application/json') !== -1 ?
// 					'application/json' : 'text/plain'
// 			});
// 			res.end(JSON.stringify(result));
// 		}
// 	},
// 	setNoCacheHeaders = function () {
// 		res.setHeader('Pragma', 'no-cache');
// 		res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
// 		res.setHeader('Content-Disposition', 'inline; filename="files.json"');
// 	},
// 	handler = new app.UploadHandler(req, res, handleResult);
// switch (req.method) {
// case 'OPTIONS':
// 	res.end();
// 	break;
// case 'HEAD':
// case 'GET':
// 	if (req.url === '/files') {
// 		setNoCacheHeaders();
// 		if (req.method === 'GET') {
// 			handler.get();
// 		} else {
// 			res.end();
// 		}
// 	} else {
// 		app(req, res);
// 	}
// 	break;
// case 'POST':
// 	setNoCacheHeaders();
// 	handler.post();
// 	break;
// case 'DELETE':
// 	handler.destroy();
// 	break;
// default:
// 	res.statusCode = 405;
// 	res.end();
// }
//};
