/*
*	v1 api router
*/

const Router = require('koa-router')

module.exports = function(app, controllers){
	let v1 = new Router({ prefix: '/v1' })
		.get('/ubike-station/taipei', controllers.v1.ubikeStation.find2Nearest)

	app.use(v1.routes())
	app.use(v1.allowedMethods())
};



