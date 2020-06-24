const express = require('express');
const router = express.Router();

const fs = require('fs')
const path = require('path');

const API = require('../services/');

const download = require('image-downloader');

router.get('/', async (req, res, next) => {

	fs.readdir('images', (err, files) => {
		if (err) throw err;

		for (const file of files) {
			fs.unlink(path.join('images', file), err => {
				if (err) throw err;
			});
		}
	});

	let images = [];

	for (let i = 0; i < 5; i++) {

		var response = await API.fox();
		images.push(response.image);

		let name = response.image.split('/').pop();

		const options = {
			url: response.image,
			dest: `${__dirname}/../images/${name}`
		}

		download.image(options)
			.then(({ filename }) => {
				console.log('indirdim:', filename);
			})

		if (i == 4) {
			return res.send(images)
		};

	}

});


module.exports = router;