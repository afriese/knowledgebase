// core function
var http = require('https');

// node modules
var express = require('express');
var jade = require('jade');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

// my modueles

// Settings
app.set('view engine', 'jade');
app.set('views', __dirname + '/');
app.use(bodyParser.urlencoded());
app.use(cookieParser())

// Verzeichnisse
app.use('/util', express.static(__dirname + '/util/'));
app.use('/assets', express.static(__dirname + '/assets/'))
app.use('/downloads', express.static(__dirname + '/downloads/'))
app.use('/', express.static(__dirname + '/my_modules/'));

app.use('/ex/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/ex/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'))
app.use('/ex/fontawesome', express.static(__dirname + '/node_modules/font-awesome/'))

////////////////////////////////////////////
// Router for all knowledgebase functions //
////////////////////////////////////////////
var knowledgebase = require("./my_modules/knowledgebase/server_js");
var knowledgebasepath = "/kb";

// all getter
app.get(knowledgebasepath + "/", knowledgebase.index)
app.get(knowledgebasepath + "/test", knowledgebase.test);
app.get(knowledgebasepath + "/delarticle:*", knowledgebase.deleteArticle)
app.get(knowledgebasepath + "/editarticle:*", knowledgebase.editArticle)
app.get(knowledgebasepath + "/showarticle:*", knowledgebase.showArticle)
app.get(knowledgebasepath + "/addarticle", knowledgebase.addArticle)

// all posts
app.post(knowledgebasepath + "/mongo/editarticle", knowledgebase.mongoEditArticle)
////////////////////////////////////////////

////////////////////////////////////////////
// Router for all recepies functions      //
////////////////////////////////////////////
var rezepte = require("./my_modules/rezepte/server_js");
var rezeptepath = "/rezepte";

// all getter
app.get(rezeptepath + "/", rezepte.index)
app.get(rezeptepath + "/showrezept/:id/", rezepte.showRezept)
app.get(rezeptepath + "/editrezept/:id/", rezepte.editRezept)

////////////////////////////////////////////

////////////////////////////////////////////
// Router for all mail functions          //
////////////////////////////////////////////
var mail = require("./my_modules/mail/server_js");
var mailpath = "/mail";

// all getter
app.get(mailpath + "/", mail.getMails)

////////////////////////////////////////////

////////////////////////////////////////////
// Router for all appointment functions   //
////////////////////////////////////////////
var appointments = require("./my_modules/tasks/server_js");
var appointmentspath = "/appointments";

app.get(appointmentspath + "/all", appointments.showAllTasks);
app.get(appointmentspath + "/json", appointments.getAllTasks);

var apikey = "e3e1ba44da417f0112b02354940d26d7"
var request = require("request")
var url = "http://developer.cumtd.com/api/v2.2/json/GetStop?" + apikey + "&stop_id=it"
app.get("/tmdb", function(req, res) {

	request({
		method : 'GET',
		url : 'https://api.themoviedb.org/3/genre/movie/list?api_key=e3e1ba44da417f0112b02354940d26d7',
		headers : {
			'Accept' : 'application/json'
		}
	}, function(error, response, body) {
		var json = JSON.parse(body)
		console.log( json);
		res.render("./assets/jade/tmdb.jade", json)
	})
});


app.get("/d/546513546",function(req,res){
	res.end('<a href="/downloads/ImeldaMay.rar">Download</a>')
});

////////////////////////////////

app.get('*', function(req, res) {
	var content = {
		"url" : "afriese.de" + req.originalUrl
	}
	res.render("./assets/jade/404.jade", content);
});

/////////////////////////////

// start Server
app.listen(8082);
console.log('Server started on 8082');

