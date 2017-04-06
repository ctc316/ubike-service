/*
 *   v1/UbikeStation
 */

module.exports.find2Nearest = async (ctx, next) => {
	var lat = ctx.request.query.lat,
		lng = ctx.request.query.lng

	//check if in Taipei City
	let inTaipeiCity = await GeoDataService.checkInTaipeiCity(lat, lng)
	if(!inTaipeiCity) {
		return ctx.body = {code:-2, result:[]}
	}

	//find 2 nearest stations
	let retVal = UbikeDataService.find2Nearest(lat, lng)

	//all ubike stations are full
	if(retVal.length == 0) {
		return ctx.body = {code:1, result:[]}
	}

	//response
	return ctx.body = {code: 0, result:retVal}
}

