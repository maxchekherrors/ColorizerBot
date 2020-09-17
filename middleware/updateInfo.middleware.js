const User = require('../botApi/user/user.model');
module.exports = async ({message:{from}},next)=>{
	const {id,first_name,last_name,username} = from;
	await User.updateOne({_id:id},{
		userName: username,
		firstName: first_name,
		lastName: last_name
	},{upsert:true});
	return next();
};