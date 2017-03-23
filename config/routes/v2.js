/*
*	v2 api router
*/

const Router = require('koa-router')

module.exports = function(app){
    let v2 = new Router({ prefix: '/v2' })
		.get('/', function (ctx, next) {
	    	ctx.body = `Hello, v2 api is not ready yet.`;
		})

	app.use(v2.routes())
	app.use(v2.allowedMethods())
};



