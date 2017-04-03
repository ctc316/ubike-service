/*
 *  run before server start
 */

module.exports = () => {
	console.log("Run bootstrap functions")
	UbikeDataService.updateToLatest(function(err, data){
		if(err) throw err
		setInterval(function(){
			console.log("Pull Youbike Data")
			UbikeDataService.updateToLatest(function(err, data){})
		}, 60000)
	})
}