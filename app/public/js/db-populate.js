'use strict';
var db = new Dexie('applicationDatabase');
db.version(1).stores({
	server: 'active,central,myip',
	servers: 'ip',
	contacts: 'id,name,email,status,phone,nickname,designation,organisation,image,central,secret,blocked,friend',
	active: 'id',
	messages: 'id,content[name,type,body,meta]'
});
db.open()
	.catch(function (error) {
		console.log('Uh oh : ' + error);
	});
console.log('DB Opened');
db.server.add({
	active: 'localhost',
	central: 'pinquip.herokuapp.com',
	myip: '192.168.1.2'
});
db.servers.add({
	ip: 'localhost'
});
db.servers.add({
	ip: 'pq.sundreems.com'
});
db.servers.add({
	ip: '192.168.1.6'
});
db.servers.add({
	ip: '127.0.0.1'
});
db.contacts.add({
	id: 'vikashkumar',
	name: 'Vikash Kumar',
	email: 'vikashkumar1109@gmail.com',
	phone: '9806540120',
	nickname: 'Vikash',
	designation: 'CEO',
	organisation: 'Facebook',
	image: '/images/DP/9806540120.jpg',
	central: true,
	secret: 'RedRobin',
	blocked: false,
	friend: true
});
db.contacts.add({
	id: 'keertyverma1303',
	name: 'Keerty Verma',
	email: 'keertyverma1303@gmail.com',
	phone: '8982275503',
	nickname: 'Keerty',
	designation: 'Director',
	organisation: 'Google',
	image: '/images/DP/8982275503.jpg',
	central: true,
	secret: 'Forgetter',
	blocked: false,
	friend: true
});
db.contacts.add({
	id: 'viplavvimal0305',
	name: 'Viplav Vimal',
	email: 'viplav.coolrider@gmail.com',
	phone: '9907653833',
	nickname: 'Viplav',
	designation: 'Pilot',
	organisation: 'Indian Air Force',
	image: '/images/DP/9907653833.jpg',
	central: true,
	secret: 'CoolRider',
	blocked: false,
	friend: false
});
console.log('DB Populated');

db.contacts.orderBy('name').each(function (friend) {
	console.log('con' + JSON.stringify(friend));
});
console.log('DB Printed');
db.delete();
console.log('DB Destroyed');
