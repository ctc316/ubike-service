const path = require('path')
const _ = require('lodash')

const PATH_ENV = path.resolve(__dirname, "env")
const PATH_ROUTES = path.resolve(__dirname, "routes")
const PATH_CONTROLLERS = path.resolve(__dirname, "../api/controllers")
const PATH_SERVICES = path.resolve(__dirname, "../api/services")

var config = {
    env: process.env.NODE_ENV || "development",
    path: {
		controllers: PATH_CONTROLLERS,
		services: PATH_SERVICES,
		routes: PATH_ROUTES
	},
	ubikePollingIntv: 5 * 60000  //update interval: 1 min on ubike data specification, actually is 5 mins
}

if(config.env === 'development' || config.env === 'production'){
    config = _.extend(config, require(path.resolve(PATH_ENV, config.env)))
}

module.exports = config