/*
 *   UbikeDataService
 */

const request = require('request-promise-native')
const _ = require('lodash')
const Ajv = require('ajv')

const YOUBIKE_DATA_URL = "http://data.taipei/youbike"

/*
 *	Since Youbike data is few and should be updated frequently,
 *  simply store it in memory through global encapsulation
 *	Data Definitions
 *		sno：站點代號
 * 		sna：場站名稱(中文)
 *		tot：場站總停車格
 * 		sbi：場站目前車輛數量
 * 		sarea：場站區域(中文)
 *		mday：資料更新時間
 *		lat：緯度
 *		lng：經度
 *		ar：地(中文)
 *		sareaen：場站區域(英文)
 *		snaen：場站名稱(英文)
 * 		aren：地址(英文)
 *		bemp：空位數量
 *		act：全站禁用狀態
 */
let ubikeData = {}

/*
 * data validator
 */
let ajv = new Ajv({ coerceTypes: true })
let uBikeDataSchema = {
	"type": "object",
	"patternProperties": {
		'.*': {
			"type": "object" ,
			"properties": {
				"sno": 		{ "type": "string" },
				"sna": 		{ "type": "string" },
				"tot": 		{ "type": "integer" },
				"sbi": 		{ "type": "integer" },
				"sarea": 	{ "type": "string" },
				"mday": 	{ "type": "integer" },
				"lat": 		{ "type": "number" },
				"lng": 		{ "type": "number" },
				"ar": 		{ "type": "string" },
				"sareaen": 	{ "type": "string" },
				"snaen": 	{ "type": "string" },
				"snaen": 	{ "type": "string" },
				"aren": 	{ "type": "string" },
				"bemp": 	{ "type": "integer" },
				"act": 		{ "type": "integer" },
			},
			"additionalProperties": false,
		},
	},
	"additionalProperties": false,
}
let validate = ajv.compile(uBikeDataSchema)


async function requestUbikeData(){
	try {
		const resp = await request({
			method: 'GET',
			uri: YOUBIKE_DATA_URL,
			gzip: true,
			json: true
		})
		return resp
	} catch (err){
		throw err
	}
}

module.exports.updateToLatest = async () => {
	try {
		let resp = await requestUbikeData()
		let val = resp.retVal
		if (!validate(val)) {
			throw(new Error("Ubike Data Validation Fail."))
		}
		ubikeData = val
		let size = Object.keys(ubikeData).length
		let updateTime = ubikeData['0001']['mday']
		console.log(`YouBike Data Updated -> Code=${resp.retCode}, Total=${size}, UpdateTime=${updateTime}`)
	} catch (err) {
		throw err
	}
}


/*
validation for location 25.034153, 121.568509
{
	{
      "station": "興雅國中",
      "distance": 268m
    },
    {
      "station": "世貿二館",
      "distance": 295m
    },
    {
      "station": "捷運象山站",
      "distance": 315m
    }
}
*/
module.exports.find2Nearest = (lat, lng) => {
	let result = _.sortBy(ubikeData, [function(obj) {
		return GeoDataService.getDistance(lat, lng, obj.lat, obj.lng)
	}])

	let retVal = []
	for(let i=0; retVal.length<2 && i<result.length; i++) {
		if(result[i].bemp == 0) continue
		retVal.push({
			"station": result[i].sna,
			"num_ubike": result[i].bemp
		})
	}
	return retVal
}


