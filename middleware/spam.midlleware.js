'use strict';
//const Extra = require('telegraf/extra');
const config = require('../config');
module.exports = ({session,replyWithHTML}, next)=>{
	if(!session.__touch){
		session.__touch = {last:Date.now()};
		return next();
	}
	const {__touch} = session;
	if(Date.now() - __touch.last>config.bot.touchInterval*1000){
		__touch.last = Date.now();
		return next();
	}
	replyWithHTML('Hey, not so fast, bro');

};