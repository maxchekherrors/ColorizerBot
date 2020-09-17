const Scene = require('telegraf/scenes/base');
const controllers = require('./user.controller');
const mainScene = new Scene('main');

exports.mainScene = ()=>{
	mainScene.start(controllers.start);
	mainScene.on('photo',controllers.getPhoto);
	mainScene.on('message',controllers.error);
	return mainScene;
};


