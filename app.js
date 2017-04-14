const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-body')
const helmet = require('koa-helmet')
const cors = require('kcors')

const swagger = require('swagger2')
const swagger_router = require('swagger2-koa').router
const swagger_validate = require('swagger2-koa').validate
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

//Simple Log
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.request.ip} -> ${ctx.method} ${ctx.url} - ${ms}ms`)
})

//Error Handler
app.use(async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		ctx.status = err.statusCode || err.status || 500
		console.log(`Error Response: Code=${ctx.status}, Message=${err.message}`)
		if(ctx.status == 500) {
			console.error(err)
		}
	}
});

//Start Server
var serve = async () => {
	try {
		await bootstrap(app, config)
		return app.listen(config.port, () => {
			console.log(config)
			console.info(`Server "${package.name} v${package.version}" started, listening on port ${config.port}...`)
		})
	} catch(err) {
		console.error(err)
		process.exit(1)
	}
}
if(config.env == 'test') {
	module.exports = serve
} else {
	serve()
}






