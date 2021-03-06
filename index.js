'use strict';
const config = require('./config');
const mongoose = require('mongoose');
const app = require('./server');
const bot = require('./bot');




async function bootstrap() {
	await mongoose.connect(`${config.database.connectionString}`, {useNewUrlParser: true});
	await bot.telegram.setWebhook(`${config.bot.webHook}`);
	return app.listen(`${config.server.port}`);
}

bootstrap()
	.then((server) => {
		console.log(`🚀 Server listening on port ${server.address().port}!`);
	})
	.catch(err => {
		setImmediate(() => {
			console.error('Unable to run the server because of the following error:');
			console.error(err);
			process.exit();
		});
	});