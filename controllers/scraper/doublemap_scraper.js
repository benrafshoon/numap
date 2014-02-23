var https = require("https");
var mongoose = require("mongoose");


var jsonRequest = function(hostname, path, onJsonData) {
	var request = https.request({
		hostname: hostname,
		method: "GET",
		path: path
		
	}, function(response) {
		//console.log("Status: ", response.statusCode);
		//console.log("Headers: ", JSON.stringify(response.headers));
		response.setEncoding("utf8");
		var responseString = "";
		response.on("data", function(chunk) {
			responseString += chunk;
		});
		response.on("end", function() {
			onJsonData(JSON.parse(responseString));
		});
	});
	
	request.on("error", function(e) {
		console.log("Error: ", e);
	});
	
	request.end();
};

exports.scrapeStops = function(onDone) {
	console.log("Scraping doublemap for stops");
	jsonRequest("northwestern.doublemap.com", "/map/v2/stops", function(data) {
		var numProcessed = 0;
		data.forEach(function(element, index, array) {
			var ShuttleStop = mongoose.model("ShuttleStop");
			ShuttleStop.find({doubleMapId: element.id}, function(error, shuttleStops) {
				if(error) {
					console.log("Error: ", error);
					return;
				}
				var shuttleStop;
				if(shuttleStops.length == 0) {
					shuttleStop = new ShuttleStop({doubleMapId: element.id});
				} else {
					shuttleStop = shuttleStops[0];
				}
				shuttleStop.doubleMapDescription = element.description;
				shuttleStop.doubleMapLatitude = element.lat;
				shuttleStop.doubleMapLongitude = element.lon;
				shuttleStop.dateModified = new Date();
				shuttleStop.save(function(error) {
					if(error) {
						console.log("Error: ", error);
						return;
					} else {
						numProcessed++;
						if(numProcessed == data.length) {
							console.log("Done scraping doublemap for stops");
							if(onDone) {
								onDone();
							}
						}
					}
				});
			});
		});
	});
};

exports.scrapeStops = function(onDone) {
	console.log("Scraping doublemap for stops");
	jsonRequest("northwestern.doublemap.com", "/map/v2/stops", function(data) {
		var numProcessed = 0;
		data.forEach(function(element, index, array) {
			var ShuttleStop = mongoose.model("ShuttleStop");
			ShuttleStop.find({doubleMapId: element.id}, function(error, shuttleStops) {
				if(error) {
					console.log("Error: ", error);
					return;
				}
				var shuttleStop;
				if(shuttleStops.length == 0) {
					shuttleStop = new ShuttleStop({doubleMapId: element.id});
				} else {
					shuttleStop = shuttleStops[0];
				}
				shuttleStop.doubleMapDescription = element.description;
				shuttleStop.doubleMapLatitude = element.lat;
				shuttleStop.doubleMapLongitude = element.lon;
				shuttleStop.dateModified = new Date();
				shuttleStop.save(function(error) {
					if(error) {
						console.log("Error: ", error);
						return;
					} else {
						numProcessed++;
						if(numProcessed == data.length) {
							console.log("Done scraping doublemap for stops");
							if(onDone) {
								onDone();
							}
						}
					}
				});
			});
		});
	});
};


exports.scrapeRoutes = function(onDone) {
	console.log("Scraping doublemap for routes");
	jsonRequest("northwestern.doublemap.com", "/map/v2/routes", function(data) {
		var numProcessed = 0;
		data.forEach(function(element, index, array) {
			var ShuttleRoute = mongoose.model("ShuttleRoute");
			console.log(element);
			
			ShuttleRoute.find({doubleMapId: element.id}, function(error, shuttleRoutes) {
				if(error) {
					console.log("Error: ", error);
					return;
				}
				var shuttleRoute;
				if(shuttleRoutes.length == 0) {
					shuttleRoute = new ShuttleRoute({doubleMapId: element.id});
				} else {
					shuttleRoute = shuttleRoutes[0];
				}
				shuttleRoute.doubleMapName = element.name;
				shuttleRoute.doubleMapDescription = element.description;
				shuttleRoute.doubleMapShortName = element.short_name;
				shuttleRoute.doubleMapDescription = element.description;
				shuttleRoute.doubleMapColor = element.color;
				shuttleRoute.dateModified = new Date();
				shuttleRoute.save(function(error) {
					if(error) {
						console.log("Error: ", error);
						return;
					} else {
						numProcessed++;
						if(numProcessed == data.length) {
							console.log("Done scraping doublemap for routes");
							if(onDone) {
								onDone();
							}
						}
					}
				});
			});
		});
	});
};




