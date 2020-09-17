const Scene = require('telegraf/scenes/base');
const controllers = require('./user.controller');
const mainScene = new Scene('main');
const spamMiddleware = require('../../middleware/spam.midlleware');
const updateMiddleware = require('../../middleware/updateInfo.middleware');
exports.mainScene = ()=>{
	mainScene.start(updateMiddleware,controllers.start);
	mainScene.on('photo',spamMiddleware,updateMiddleware,controllers.getPhoto);
	mainScene.on('message',controllers.error);
	return mainScene;
};


