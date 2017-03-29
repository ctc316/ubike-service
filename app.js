const fs = require('fs')
const path = require('path')

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

let app = new Koa()

//Body parser
app.use(body())

//CORS
app.use(cors())

//Security
app.use(helmet())

//Log
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.request.ip} -> ${ctx.method} ${ctx.url} - ${ms}ms`)
})

// Swagger - UI
const document = swagger.loadDocumentSync(__dirname + '/swagger.yml')
app.use(swagger_ui(document, "/docs"))

//Swagger - validate
if (!swagger.validateDocument(document)) {
  throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`)
}
app.use(swagger_validate(document))


// Config Routes
fs.readdir(config.path.routes, (err, files) => {
		files
		.filter(f => { return !f.startsWith(".") })
		.forEach(f => {
				require(path.join(config.path.routes,f))(app)
		});
})

// Listening
app.listen(config.port, () => {
		console.log(`[ ${package.name} v${package.version} ] started, listening on port ${config.port}...", `)
		console.info(config)
})


