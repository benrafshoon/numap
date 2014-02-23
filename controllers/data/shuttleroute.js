var mongoose = require("mongoose");

exports.handler = function() {
	return function(request, response) {
		response.type("json");
		var ShuttleRoute = mongoose.model("ShuttleRoute");
		ShuttleRoute.find({}, function(err, shuttleRoutes) {
			response.send(shuttleRoutes.map(function(element) {
				element.__v = undefined;
				return element;
			}));
		});
		
	};
};
