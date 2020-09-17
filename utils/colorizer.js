const deepai = require('deepai');
const config = require('../config');
deepai.setApiKey(`${config.aiApi.key}`);
module.exports = async (file) => {
	const {output_url} = await deepai.callStandardApi('colorizer', {
		image: file
	});
	return output_url;
};
