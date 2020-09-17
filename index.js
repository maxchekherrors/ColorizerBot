'use strict';
const config = require('./config');
const Koa = require('koa');
const helmet = require('koa-helmet')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')({ allowMethods: ['POST'] });
const koaBody = require('koa-body')();
const mongoose = require('mongoose');
const bot = require('./bot');

const app = new Koa();

app.use(helmet)
	.use(compress)
	.use(cors)
	.use(koaBody);

app.use(async (ctx) => {
	if (ctx.method !== 'POST' || ctx.url !== `/${config.bot.password}`) {
		return;
	}
	await bot.handleUpdate(ctx.request.body, ctx.response);
	ctx.status = 200;
});

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