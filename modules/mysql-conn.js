const mysql = require('mysql2/promise');
const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
	waitForConnections: true,
	connectionLimit: 10
});

const sqlGen = (obj) => {
	let { mode=null, table=null, field=[], data={}, file=null, id=null, sql=null, values=[], desc=null } = obj;
	let temp = Object.entries(data).filter(v => field.includes(v[0]));
	console.log(id);

	switch(mode) {
		case 'I':
			sql = `INSERT INTO ${table} SET `;
			break;
		case 'U':
			sql = `UPDATE ${table} SET `;
			break;
		case 'D':
			sql = `DELETE FROM ${table} WHERE id=${id} `;
			break;
		case 'S':
			sql = `SELECT ${field.length == 0 ? '*' : field.toString()} FROM ${table} `;
			if(id) sql += ` WHERE id=${id} `;
			if(desc) sql += ` ${desc} `;
			break;
	}

	for(let v of temp) {
		sql += `${v[0]}=?,`;
		values.push(v[1]);
	}

	if(file) {
		sql += `savefile=?,realfile=?,`;
		values.push(file.filename);
		values.push(file.originalname);
	}
	sql = sql.substr(0, sql.length - 1);

	if(mode == 'I', mode == 'U') sql += ` WHERE id=${id}`;

	console.log(sql, values);


	//return { sql, values, sqlGen }
}

module.exports = { mysql, pool };