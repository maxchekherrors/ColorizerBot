'use strict';
const joi = require('joi');
const envSchema = joi
	.object({
		WEB_HOOK: joi.string().required(),
		BOT_PASSWORD: joi.string().alphanum(),
		BOT_TOKEN: joi.string().required(),
		BOT_TOUCH_INTERVAL:joi.number().min(3).max(60)
	})
	.unknown()
	.required();

const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}
const config = {
	bot: {
		token: envVars.BOT_TOKEN,
		password: envVars.BOT_PASSWORD,
		webHook: `${envVars.WEB_HOOK}/${envVars.BOT_PASSWORD}`,
		touchInterval: envVars.BOT_TOUCH_INTERVAL||10
	}
};

module.exports = config;