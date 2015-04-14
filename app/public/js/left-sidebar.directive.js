'use strict';
$nvc.directive('leftSidebar', function () {
	return {
		restrict: 'E',
		templateUrl: 'partials/left-sidebar.directive.html',
		controller: function ($http, handler, $rootScope, $scope) {
			var left = this;
			left.myimage = '';
			$scope.$on('registration', function () {
				console.log('image' + handler.mydetail.image);
				left.myimage = handler.mydetail.image;
			});
			//var remoteCouch = window.location.href + 'handler.dbDetails/handler.dbDetailsDetails';
			left.ContactsCheck = [];
			left.tab = 'none';
			//$http.get('http://localhost:3000/JSON/contacts.json').success(function (data) {
			//			left.ContactsCheck = data;
			//		addToDB();
			//});
			handler.dbDetails.info(function (err, info) {
				handler.dbDetails.changes({
						since: info.update_seq,
						continuous: true
					}).$promise
					.then(null, null, onChange);
			});
			handler.dbDetails.allDocs({
				include_docs: true
			}, function (err, doc) {
				if (!err) {
					doc.rows.forEach(function (todo) {
						if (!todo.doc.blocked) {
							left.ContactsCheck.push(todo.doc);
						}
					});
					//console.log('change' + JSON.stringify());
					//left.ContactsCheck.push(JSON.stringify(change.doc));
				} else {
					console.log('Change error' + err);
				}
			});

			function onChange() {
				handler.dbDetails.allDocs({
					include_docs: true
				}, function (err, doc) {
					if (!err) {
						doc.rows.forEach(function (todo) {
							console.log('change :' + todo.doc);
							left.ContactsCheck.push(todo.doc);
						});
						//console.log('change' + JSON.stringify());
						//left.ContactsCheck.push(JSON.stringify(change.doc));
					} else {
						console.log('Change error' + err);
					}
				});
			}

			// function addToDB() {
			// 	left.ContactsCheck.forEach(function (todo) {
			// 		handler.dbDetails.post(todo);
			// 	});
			// }

			left.activeuser = {};

			left.selectTab = function (setTab) {
				left.tab = setTab;
				left.ContactsCheck.forEach(function (todo) {
					if (todo.username === setTab) {
						left.activeuser = todo;
						handler.activeContact = left.activeuser;
						$rootScope.$broadcast('new', handler.activeContact);
					}
				});
				//$cookieStore.put('active', left.activeuser);
			};
			left.isSelected = function (checkTab) {
				return left.tab === checkTab;
			};
			/*	//Calling Sync method
				if (remoteCouch) {
					sync();
				}
				// sync error handler
				function syncError(err) {
						console.log('database sync error' + err);
					}
					//function to sync remote database and local database
				function sync() {
					console.log('database syncing');
					var opts = {
						live: true,
						retry: true
					};
					handler.dbDetails.replicate.to(remoteCouch, opts)
						.on('complete', function () {
							console.log('database syncto complete');
						})
						.on('error', function (err) {
							syncError(err);
						});
					handler.dbDetails.replicate.from(remoteCouch, opts)
						.on('complete', function () {
							console.log('database syncfrom complete');
						})
						.on('error', function (err) {
							syncError(err);
						});
				}*/
		},
		controllerAs: 'left'
	};
});
