const mysql = require('mysql');
module.exports = {
	con: mysql.createConnection({
		host     : 'lhcp1059.webapps.net',
		user     : 'pn1yme2p_kartsng',
		password : 'kartsngo2019',
		database : 'pn1yme2p_kartsngo'
	})
};