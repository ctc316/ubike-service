/*
 *   UbikeDataService
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

const request = require('request');
const YOUBIKE_DATA_URL = "http://data.taipei/youbike"

function requestUbikeData(callback){
    request({
		method: 'GET',
		uri: YOUBIKE_DATA_URL,
		gzip: true
    }, function (err, res, body) {
    	if(err) return callback(err)
    	try {
    		var json;
	   		json = JSON.parse(body);
	    } catch (e) {
	   		callback(e)
	    }finally {
	    	callback(null, json)
	    }
    })
}

module.exports.updateToLatest = function(callback){
    console.log("updateToLatest")
    requestUbikeData(function(err, data){
    	if(err) return callback(err)
    	console.log(data)
    })
}
