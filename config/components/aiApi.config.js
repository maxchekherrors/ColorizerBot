'use strict';
const joi = require('joi');
const envSchema = joi
	.object({
		AI_API_KEY: joi.string().required(),
	})
	.unknown()
	.required();

const {error, value: envVars} = envSchema.validate(process.env);
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}
const config = {
	aiApi: {
		key: envVars.AI_API_KEY,
	}
};

module.exports = config;