//Libraries
var express = require("express");
var mongoose = require("mongoose");
var sass = require("node-sass"); 


//Other files
var models = require("./models");
var doubleMapScraper = require("./controllers/scraper/doublemap_scraper");
var nuShuttlesScraper = require("./controllers/scraper/nushuttles_scraper");
var shuttleRouteController = require("./controllers/data/shuttleroute");

mongoose.connect("mongodb://localhost/numap");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to database"));
db.once("open", models.initialize(mongoose, function() {
	//scraper.scrapeStops();
	//scraper.scrapeRoutes();
	//scraper.scrapeSubroutes();
}));

var app = express();
app.set("view engine", "jade");

app.use("/static/css", sass.middleware({
	src: __dirname + "/sass",
	dest: __dirname + "/public/css",
	debug: true,
	outputStyle: "compressed"
}));


app.use(express.logger());
app.use('/static', express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + '/frontend_lib'));

app.all("/data/shuttleroute", shuttleRouteController.handler());

app.get("/editor", function(request, response) {
	response.render("editor/index");
});
app.get("/editor/:editorpartial", function(request, response) {
	response.render("editor/" + request.params.editorpartial);
});

app.use(function(request, response) {
	response.send("Hello world");
});

app.listen(3000);
console.log("Starting app");


