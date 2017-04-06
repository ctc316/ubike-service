/*
 *  GeoDataService
 */

const request = require('request-promise-native')
const jsonQuery = require('json-query')
const geolib = require('geolib')

module.exports.checkInTaipeiCity = async (lat, lng) => {
	try {
		let resp = await request({
    		method: 'GET',
    		uri: `http://maps.google.com/maps/api/geocode/json?latlng=${lat},${lng}`,
    		json: true
		})
		let query = "[*address_components][short_name=Taipei City]"
    	let result = jsonQuery(query, {data: resp.results}).value
    	if(!!result) return true
	} catch (err){
		console.error("checkInTaipeiCity:", err)
		throw(err)
	}
	return false
}


module.exports.getDistance = (lat1, lng1, lat2, lng2) => {
	return geolib.getDistance(
    	{latitude: lat1, longitude: lng1},
    	{latitude: lat2, longitude: lng2}
	);
}