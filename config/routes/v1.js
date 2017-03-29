/*
*	v1 api router
*/

const Router = require('koa-router')
// var controller = require('../controller/index');

module.exports = function(app){
    let v1 = new Router({ prefix: '/v1' })
		.get('/', function (ctx, next) {
			ctx.body = `v1: Hello ${ctx.request.query.name}!`
		})
		.post('/', function (ctx, next) {
	    	ctx.body  = {version: "v1", route: '/', query: ctx.request.query, body: ctx.request.body}
		})
		.get('/ubike-station/taipei', function (ctx, next) {
			ctx.body = `v1: lat=${ctx.request.query.lat}, lng=${ctx.request.query.lng}`
		})
	app.use(v1.routes())
	app.use(v1.allowedMethods())
};



