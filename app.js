const path = require('path')
const glob = require("glob")
const _ = require("lodash")

const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-body')
const helmet = require('koa-helmet')
const cors = require('kcors')

const swagger = require('swagger2')
const swagger_router = require('swagger2-koa').router;
const swagger_validate = require('swagger2-koa').validate;
const swagger_ui = require('swagger2-koa').ui

const package = require(path.join(__dirname, "package.json"))
const config = require(path.join(__dirname, "config"))
const bootstrap = require(path.join(__dirname, "config/bootstrap.js"))

var app = new Koa()

//CORS
app.use(cors())

//Security
app.use(helmet())

//Body Parser
app.use(body())

// Swagger - UI
const document = swagger.loadDocumentSync(__dirname + '/swagger.yml')
app.use(swagger_ui(document, "/docs"))

//Swagger - validate
if (!swagger.validateDocument(document)) {
  throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`)
}
app.use(swagger_validate(document))

//Log
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.request.ip} -> ${ctx.method} ${ctx.url} - ${ms}ms`)
});


function loadJSExposes(target, filePath) {
	var files = glob.sync(filePath + "/**/**.js", null)
	files.forEach((f) => {
		var paths = f.replace(filePath + "/", "").replace(".js","").split("/")
		var	idx = paths.length-1, obj = {}
		obj[paths[idx--]] = require(f)
		while(idx >= 0) {
			var tmp = obj
			obj = {}
			obj[paths[idx--]] = tmp
		}
		_.merge(target, obj)
	})
}

// Load Controllers & Config Routes
(function(app, config){
	var controllers = {}
	loadJSExposes(controllers, config.path.controllers)
	var routesFiles = glob.sync(config.path.routes + "/**/**.js", null)
	routesFiles.forEach(f => {
		require(f)(app, controllers)
	})
})(app, config);

// Load Services and Expose to global
(function(app, config){
	var services = {}
	loadJSExposes(services, config.path.services)
	for(var idx in services){
		if(!global.hasOwnProperty(idx))
			global[idx] = services[idx]
	}
})(app, config);

// Run bootstrap
bootstrap()

// Listening
app.listen(config.port, () => {
		console.log(`[ ${package.name} v${package.version} ] started, listening on port ${config.port}...", `)
		console.info(config)
})




