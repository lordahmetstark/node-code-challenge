const express = require('express');
const router = express.Router();

const fs = require('fs')

router.get('/', async (req, res, next) => {


	return res.send(200);

});


module.exports = router;