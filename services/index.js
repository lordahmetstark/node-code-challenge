
const axios = require('axios');
const http = axios.create({ baseURL: 'https://randomfox.ca/' });

exports.fox = async () => {
	return new Promise((resolve, reject) => {
		return http
			.get(`floof`)
			.then(response => resolve(response.data))
			.catch(error => reject(error))
			.finally(() => { });
	});
};