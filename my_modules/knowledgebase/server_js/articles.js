var pagedata = require("mongojs").connect("localhost:27017/content", ["pages", "recepies", "articles", "files"]);


// configuration
var nav = require("../json/navconfig.json");
console.log(nav)

exports.test = function(req, res) {
	console.log("First test");
	res.end("HALLO");
}
 
exports.index = function(req, res) {
	pagedata.articles.find(function(err, document) {
		var list = {
			"nav":nav,
			"list" : document
		};
		res.render("my_modules/knowledgebase/jade/allarticle.jade", list);
	});
}

exports.showArticle = function(req, res) {
	pagedata.articles.findOne({
		"title" : req.params[0]
	}, function(err, document) {
		var x = document.text;
		var article = {
			"nav":nav,
			"title" : document.title,
			"content" : compileArticle(document.text)
		};
		res.render("my_modules/knowledgebase/jade/article.jade", article);
	});
}

exports.editArticle = function(req, res) {
	pagedata.articles.findOne({
		"title" : req.params[0]
	}, function(err, document) {
		var article = {
			"nav":nav,
			"title" : document.title,
			"content" : document.text
		};
		res.render("my_modules/knowledgebase/jade/editarticle.jade", article);
	});
}

exports.addArticle = function(req, res) {
	res.render("my_modules/knowledgebase/jade/editarticle.jade", {
		"nav":nav,
		"title" : "",
		"content" : ""
	});
}

exports.deleteArticle = function(req, res) {
	pagedata.articles.remove({
		"title" : req.params[0]
	});
	res.end();
}

exports.mongoEditArticle = function(req, res) {
	pagedata.articles.update({
		"title" : req.body.title
	}, req.body, {
		"upsert" : true
	})
	res.end("OK");
}
function compileArticle(code) {
	// Callouts
	code = code.replace(/\[info\]/g, '<div class="bs-callout bs-callout-info">');
	code = code.replace(/\[\/info\]/g, '</div>');
	code = code.replace(/\[warn\]/g, '<div class="bs-callout bs-callout-warning">');
	code = code.replace(/\[\/warn\]/g, '</div>');
	code = code.replace(/\[err\]/g, '<div class="bs-callout bs-callout-danger">');
	code = code.replace(/\[\/err\]/g, '</div>');
	code = code.replace(/\[suc\]/g, '<div class="bs-callout bs-callout-success">');
	code = code.replace(/\[\/suc\]/g, '</div>');

	// Heading
	code = code.replace(/\[h1\]/g, '<h1>');
	code = code.replace(/\[\/h1\]/g, '</h1>');
	code = code.replace(/\[tex\]/g, '<p>');
	code = code.replace(/\[\/tex\]/g, '</p>');

	// lists
	code = code.replace(/\[list\]/g, '<ul class="list-unstyled">');
	code = code.replace(/\[\/list\]/g, '</ul>');
	code = code.replace(/\[entry\]/g, '<li>');
	code = code.replace(/\[\/entry\]/g, '</li>');

	// Code
	code = code.replace(/\[com\]/g, '<pre> $ ');
	code = code.replace(/\[\/com\]/g, '</pre>');

	// others
	code = code.replace(/\[/g, '[');
	code = code.replace(/\]/g, ']');
	code = code.replace(/\\b/g, "<br>")

	// formating
	code = code.replace(/\[b\]/g, "<strong>")
	code = code.replace(/\[\/b\]/g, "</strong>")
	
	// Links
	code = code.replace(/\[a:/g, '<a target="_blank" href="');
	code = code.replace(/\[\/a\]/g, "</a>");
	code = code.replace(/\]/g, '">');
	console.log(code)

	return code;
}