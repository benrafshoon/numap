var http = require("http");
var cheerio = require("cheerio");
var url = require("url");
var mongoose = require("mongoose");


var htmlRequest = function(hostname, path, onHTMLData) {
	var request = http.request({
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
			onHTMLData(cheerio.load(responseString));
		});
	});
	
	request.on("error", function(e) {
		console.log("Error: ", e);
	});
	
	request.end();
};


exports.scrapeSubroutes = function(onDone) {
	var ShuttleSubroutes = mongoose.model("ShuttleSubroute");
	ShuttleSubroutes.find({}, function(error, shuttleSubroutes) {
		if(error) {
			console.log(error);
			return;
		}
		shuttleSubroutes.forEach(function(element, index, array) {
			console.log(element);
			var urlParts = url.parse(element.dataURL);
			htmlRequest(urlParts.host, urlParts.path, function($) {
				
				var trs = $("table.us_table>tbody").children();
				var title = trs.first().text().replace(/[\n\r]/g, "");
				console.log("Title: " + title);
				var amPMHeader = trs.eq(1).children().toArray().map(function(element) {
					return $(element).text().replace(/[\n\r]/g, "").toLowerCase();
				});
				console.log(amPMHeader);
				var table = trs.slice(2);
				table.each(function(index, element) {
					//console.log($(element).html());
				});
			});
		});
	});
};
