'use strict';
const config = require('./config');
const {Telegraf} = require('telegraf');
const session = require('telegraf/session');
const applyBotMiddleware = require('./botApi');
const errorMiddleware = require('./middleware/error.midlleware');
const spamMiddleware = require('./middleware/spam.midlleware');
const updateMiddleware = require('./middleware/updateInfo.middleware');
const bot = new Telegraf(`${config.bot.token}`);
if (config.isTest || config.isDevelopment) bot.use(Telegraf.log());
bot.use(session())
    .use(spamMiddleware)
    .use(updateMiddleware)
    .use(errorMiddleware);
applyBotMiddleware(bot);
module.exports = bot;