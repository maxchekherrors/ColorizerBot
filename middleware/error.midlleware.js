'use strict';
module.exports = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		console.log('Error handler:', err);
		return ctx.replyWithHTML('Oh, <b>something went wrong</b>, i\'ll talk to my creator and write back to you later(');
	}
};
