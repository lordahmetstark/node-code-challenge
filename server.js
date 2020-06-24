const http = require('http');
const express = require('express');
let app = express();

const axios = require('axios');

const cors = require('cors');
const compress = require('compression');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');

const api = require('./api/');
const data = require('./data/');

var cron = require('node-cron');

app.use(favicon(`favicon.ico`));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(
	'/images',
	express.static('images', {
		setHeaders: (res) => {
			res.setHeader('Cache-Control', `max-age=${60 * 60 * 24 * 365.25}`);
		},
		redirect: false
	})
);

app.use(compress());
app.use(cors());

app.use('/api', api);
app.use('/data', data);
app.use('/', express.static('dist'));

cron.schedule('*/1 * * * *', () => {
	axios.get('http://localhost:4001/data');
});

app.set('port', process.env.PORT || 4001);
const server = http.createServer(app);
server.listen(process.env.PORT || 4001, () =>
	console.log(`⚡️ ⚡️  http://localhost:${process.env.PORT || 4001}`)
);