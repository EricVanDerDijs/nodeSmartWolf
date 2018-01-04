var express = require ("express"),
	bodyParser = require("body-parser"),
	app = express(),
	port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", function(req, res){
	res.render("index");
});

app.listen(port, function(req, res){
	console.log("smartwolf started at port: " + port);
});