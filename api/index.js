const express = require('express');
const router = express.Router();

const fs = require('fs')

router.get('/', async (req, res, next) => {

	let images = [];

	fs.readdir('images', (err, files) => {
		files.forEach((file, index) => {
			images.push(file);
			if (index == 4) {
				return res.send(images);
			}
		});
	});


});


module.exports = router;