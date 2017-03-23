const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const fs = require('fs');
const path = require('path');

const package = require(path.join(__dirname, "package.json"))
const config = require(path.join(__dirname, "config"))

var app = new Koa()

//Body parser
app.use(bodyParser())

//Log
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`-> ${ctx.method} ${ctx.url} - ${ms}ms`);
})

//Config Routes
fs.readdir(config.path.routes, (err, files) => {
		files
		.filter(f => { return !f.startsWith(".") })
		.forEach(f => {
				require(path.join(config.path.routes,f))(app)
		});
})

//Listening
app.listen(config.port, () => {
		console.info(`[ ${package.name} v${package.version} ] started, listening on port ${config.port}...", `)
		console.info(config)
});


