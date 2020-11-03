const express = require('express');
const moment = require('moment');
const router = express.Router();
const { pool } = require('../modules/mysql-conn');

router.get(['/', '/list'], async (req, res, next) => {
	const pug = {title: '게시판 리스트', js: 'board', css: 'board'};
	try {
		const sql = 'SELECT * FROM board ORDER BY id DESC';
		const connect = await pool.getConnection();
		const rs = await connect.query(sql);
		pug.lists = rs[0];
		pug.lists.forEach((v) => {
			v.wdate = moment(v.wdate).format('YYYY-MM-DD');
		});
		connect.release();
		res.render('./board/list.pug', pug);
	}
	catch(e) {
		next(e);
	}
});

router.get('/write', (req, res, next) => {
	const pug = {title: '게시글 작성', js: 'board', css: 'board'};
	res.render('./board/write.pug', pug);
});

router.post('/save', async (req, res, next) => {
	const { title, content, writer } = req.body;
	var values = [title, content, writer];
	var sql = 'INSERT INTO board SET title=?, writer=?, content=?';
	try {
		const connect = await pool.getConnection();
		const rs = await connect.query(sql, values);
		connect.release();
		res.redirect('/board');
	}
	catch(err) {
		next(err);
	}
});

router.get('/view/:id', async (req, res) => {
	try{
		const pug = {title: '게시글 보기', js: 'board', css: 'board'};
		const sql = "SELECT * FROM board WHERE id=?";
		const values = [req.params.id];
		const connect = await pool.getConnection();
		const rs = await connect.query(sql, values);
		connect.release();
		pug.list = rs[0][0];
		pug.list.wdate = moment(pug.list.wdate).format('YYYY-MM-DD HH:mm:ss');
		res.render('./board/view.pug', pug);
	}
	catch(e) {
		next(e);
	}
});

module.exports = router;