const path = require('path')
const _ = require('lodash')

const PATH_ENV = path.resolve(__dirname, "env")
const PATH_ROUTES = path.resolve(__dirname, "routes")

var config = {
    env: process.env.NODE_ENV || "development",
    path: {
		routes: PATH_ROUTES
	}
};

if(config.env === 'development' || config.env === 'production'){
    config = _.extend(config, require(path.resolve(PATH_ENV, config.env)))
}

module.exports = config;