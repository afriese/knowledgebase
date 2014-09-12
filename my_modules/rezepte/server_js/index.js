var pagedata = require("mongojs").connect("localhost:27017/content", ["pages", "recepies", "articles", "files"]);
var ObjectId = require("mongojs").ObjectId
// configuration
var nav = require("../json/navconfig.json");
console.log(nav)

exports.index = function(req, res) {
	pagedata.recepies.find({}, {
		"_id" : 1,
		"name" : 1,
		"kategorie" : 1,
		"kurzbeschreibung" : 1
	}, function(err, document) {
		var list = {
			"nav" : nav,
			"content" : document
		};
		console.log(list)
		res.render("my_modules/rezepte/jade/index.jade", list)
	});
};

exports.showRezept = function(req, res) {
	pagedata.recepies.findOne({
		"_id" : ObjectId(req.params.id)
	}, function(err, document) {
		var list = {
			"nav" : nav,
			"content" : document
		};
		res.render("my_modules/rezepte/jade/rezept.jade", list)
	});
}

exports.editRezept = function(req, res) {
	pagedata.recepies.findOne({
		"_id" : ObjectId(req.params.id)
	}, function(err, document) {
		var list = {
			"nav" : nav,
			"content" : document
		};
		res.render("my_modules/rezepte/jade/editrezept.jade", list)
	});
}
