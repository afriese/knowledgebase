var konsole = false;
var commands = ["article add", "article list", "run", "remove", "edit", "exit"];
commands.sort();

var njoy = null;

$(function() {
	$("body").append('<div class="konsole"><input id="konsole" data-container="body" data-toggle="popover" data-placement="auto" data-content="<ul></ul>"></input></div>');
	//$("body").append('<div id="message">sad</div>');

	$('#konsole').popover({
		"animation" : false,
		"html" : true
	})

	$("#konsole").hide();
	$(document).keypress(function(e) {
		if (e.ctrlKey && e.which == 107 && !konsole) {
			konsole = true;
			$("#konsole").show(500);
			$("#konsole").focus();
			e.preventDefault();
		} else if (e.ctrlKey && e.which == 107 && konsole) {
			konsole = false;
			$("#konsole").hide(500);
			$('#konsole').popover('hide')
			e.preventDefault();
		} else if (konsole && e.which == 13) {
			$("#konsole").hide(500);
			$('#konsole').popover('hide')
			e.preventDefault();
			exec($("#konsole").val());
		} else if (konsole && $('#konsole').is(':focus')) {
			var currentcommand = $("#konsole").val() + String.fromCharCode(e.which);
			$('#konsole').popover('show')

			var list = new Array();
			for (var entry in commands) {
				if (commands[entry].startsWith(currentcommand)) {
					list.push(commands[entry])
				}
			}
			var suggestions = '<ul class="list-unstyled">';
			for (var i = 0; i < list.length && i < 10; i++) {
				suggestions += '<li class="hint-active">' + list[i] + "</li>";
			}
			suggestions += "</ul>"
			$(".popover-content").html(suggestions)
		} else {

		}

	});

	$("#newMessage").click(function() {
		newMessage("danger", "There is danger", 553)
	})
});

var currentMessages = 0;
function newMessage(type, text, code) {
	if (code == undefined)
		code = "";
	var html = '<div class="alert alert-' + type + ' alert-konsole-message"><strong>' + code + '</strong> ' + text + '</div>';
	currentMessages++;
	if (currentMessages > 5) {
		console.log("fadout")
		$("#message .alert:first-child").remove()
	}

	$(html).hide().appendTo("#message").fadeIn({
		"duration" : 500,
		"start" : function() {
			message++;
		}
	}).delay(5000).fadeOut(500, function() {
		message--;
	});
}

function exec(command) {
	if (command == "article add") {
		location.href = "/kb/addarticle"
	}
	if (command == "article list") {
		location.href = "/kb/"
	}
	if (command == "njoy start") {
		njoy = window.open("http://www.n-joy.de/onaircenter121-onaircenterpopup.html", "pmpopup", "toolbar=no,scrollbars=yes,resizable=yes,width=320,height=360");
		window.focus();
	}
	if (command == "njoy stop") {
		njoy.close();
	}
}
