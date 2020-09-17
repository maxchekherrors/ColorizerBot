const User = require('./user.model');
const Extra = require('telegraf/extra');
const colorize = require('../../utils/colorizer');
exports.start = ({replyWithAudio,message})=>
	replyWithAudio('CQACAgIAAxkBAAM0X14LhTzRbRyA2FtKF6aChQqS2TUAAoUJAAJrulhJ-8ST-hHeIJ4bBA', Extra
		.HTML()
		.load({
			caption: `🤘🏾Welcome to the club ${message.from.first_name || 'body!'}\nSend me your <b>black and white</b> photo and I will try to <b>color</b> it)`
		})
	);

exports.getPhoto = async ctx=>{
	const {photo} = ctx.message;
	const {message:{from:{id:userId}}} = ctx;
	const {file_id:fileId} = photo[photo.length-1];
	await ctx.replyWithHTML('...');
	await ctx.replyWithHTML( '👌🏿<i>I need a little time for this.</i>');
	const file = await  ctx.telegram.getFileLink(fileId);
	const colorizeUrl = await colorize(file);
	await User.updateOne({_id:userId},{$push:{photos:fileId}});
	return !colorizeUrl?
		ctx.replyWithHTML('Oops, something\'s broken. . .'):
		ctx.replyWithPhoto(colorizeUrl);
};
exports.error = ({replyWithHTML})=>
	replyWithHTML('I don\'t give a fuck about your message. \n<b>Send me photo or get a fuck out of here.</b>🤏');