/*
 *  run before server start
 */

const glob = require("glob")
const _ = require("lodash")

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

module.exports = async (app, config) => {
	console.info("\nBooting...")

	// Load Controllers & Config Routes
	let controllers = {}
	loadJSExposes(controllers, config.path.controllers)
	let routesFiles = glob.sync(config.path.routes + "/**/**.js", null)
	routesFiles.forEach(f => {
		require(f)(app, controllers)
	})

	// Load Services and Expose to global
	let services = {}
	loadJSExposes(services, config.path.services)
	for(var idx in services){
		if(!global.hasOwnProperty(idx))
			global[idx] = services[idx]
	}

	// Start Polling Ubike Data
	try {
		await UbikeDataService.updateToLatest()
		setInterval(async () => {
			try{
				console.log("\nUpdate Youbike Data...")
				await UbikeDataService.updateToLatest()
			} catch(err) { console.error(err) }
		}, config.ubikePollingIntv)
	} catch(err) {
		throw err
	}
}