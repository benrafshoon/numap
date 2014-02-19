var express = require("express");
var mongoose = require("mongoose");
var models = require("models");


mongoose.connect("mongodb://localhost/numap");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to database"));
db.once("open", models.initialize(mongoose));





var app = express();

app.use(express.logger());

app.use(function(request, response) {
	response.send("Hello world");
});

app.listen(3000);
console.log("Starting app");

