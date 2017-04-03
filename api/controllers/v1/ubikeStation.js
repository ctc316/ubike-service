/*
 *   v1/UbikeStation
 */

module.exports.find2Nearest = function (ctx, next){
    ctx.body = {
      code: 0,
      result:[
        {station:"s_station", num_ubike:123},
        {station:"t_station", num_ubike:456}]
      }
}

