var pagedata = require("mongojs").connect("localhost:27017/content", ["appointments"]);

var nav = require("../../../assets/json/mainpage.json");
var termine = require("../../..//my_modules/tasks/json/termine.json");


exports.showAllTasks = function(req,res){
	var content = {
		"nav":nav,
		"termine":termine
	}
	res.render("./my_modules/tasks/jade/eventtest.jade",content)
}

exports.getAllTasks = function(req,res){
	pagedata.appointments.find(function(err, document) {
		console.log("KJLlkjsdf")
		console.log(document)
		res.json(document)
		
	});
	
}; 