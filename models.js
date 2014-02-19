exports.initialize = function(mongoose) {
	return function() {
		var Schema = mongoose.Schema;
		var edgeSchema = new Schema({
			travelType: String, //walk, bike, shuttle
			schedulingType: String, //continuous (walk, bike), discrete (shuttle)
			distance: Number, 
			travelTime: Number,
			startNode: Schema.Types.ObjectId,
			endNode: Schema.Types.ObjectId
		});
		mongoose.model("Edge", edgeSchema);
		
		var nodeSchema = new Schema({
			latitude: Number,
			longitude: Number
		});
		mongoose.model("Node", nodeSchema);
		
		var shuttleStopSchema = new Schema({
			shuttleName: String,
			postedStopTime: Date
			//Eventually will have a set of actual times to compute average and worst case (ie 99 percentile) times
			
		});
		mongoose.model("Shuttle", shuttleStopSchema);
	};
};

