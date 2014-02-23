exports.initialize = function(mongoose, onInitialized) {
	return function() {
		var Schema = mongoose.Schema;
		var edgeSchema = new Schema({
			name: String,
			travelType: String, //walk, bike, shuttle
			schedulingType: String, //continuous (walk, bike), discrete (shuttle)
			distance: Number, 
			travelTime: Number,
			startNode: Schema.Types.ObjectId,
			endNode: Schema.Types.ObjectId
		});
		mongoose.model("Edge", edgeSchema);
		
		var nodeSchema = new Schema({
			name: String,
			latitude: Number,
			longitude: Number
		});
		mongoose.model("Node", nodeSchema);
		
		var namedPathSchema = new Schema({
			name: String,
			edges: [Schema.Types.ObjectId] //Set of edges that define a path (ie Sheridan Road)
		});
		mongoose.model("NamedPath", namedPathSchema);
		
		var shuttleRouteSchema = new Schema({
			name: String, //ie Evanston Loop, Intercampus
			doubleMapId: Number,
			doubleMapName: String,
			doubleMapShortName: String,
			doubleMapDescription: String,
			doubleMapColor: String,
			dateModified: Date
		});
		mongoose.model("ShuttleRoute", shuttleRouteSchema);
		
		var shuttleSubrouteSchema = new Schema({
			shuttleRoute: Schema.Types.ObjectId, 
			name: String, //ie Sun-Wed Evanston Loop, Evanston->Chicago Intercampus
			startDayOfWeek: Number, // 1 = monday, 2 = tuesday, ... 7 = sunday
			startHour: Number, //0:23
			startMinute: Number, //0:59
			endDayOfWeek: Number, //Start end times are of the form [start, end)
			endHour: Number, //If you end at 6:00, then the last valid time would be 5:59
			endMinute: Number,
			dataURL: String // NU Shuttles website url
		});
		mongoose.model("ShuttleSubroute", shuttleSubrouteSchema);
		
		var shuttleStopSchema = new Schema({
			name: String,
			doubleMapId: Number,
			doubleMapDescription: String,
			doubleMapLatitude: Number,
			doubleMapLongitude: Number,
			latitude: Number,
			longitude: Number,
			dateModified: Date
		});
		mongoose.model("ShuttleStop", shuttleStopSchema);
		
		var shuttleEdgeSchema = new Schema({
			startNode: Schema.Types.ObjectId,
			stopLocation: Schema.Types.ObjectId,
			postedArrivalTime: Date,
			postedTravelTime: Number, //in seconds, like all other durations
			shuttleName: String, //Ie Evanston Loop, Intercampus
			shuttleRoute: String, //Ie 
			dataSource: String, //Either NU website ("nuScrapper") or physical sign at shuttle stop ("sign")
			dateModified: Date
			//Eventually will have a set of actual times to compute average and worst case (ie 99 percentile) times
		});
		mongoose.model("ShuttleEdge", shuttleEdgeSchema);
		if(onInitialized) {
			onInitialized();
		}
		
	};
};

