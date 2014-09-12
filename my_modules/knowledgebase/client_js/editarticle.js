var menu = false;

$(document).ready(function() {
	$("#infobox").hide();
	$("#infobox2").hide();
	//alert("JJ");

	$(document).keypress(function(e) {
		// menue
		//if( menu ) e.preventDefault(); // total shit

		if (e.ctrlKey && e.which == 121 && !menu) {
			menu = true;
			$("#infobox").html("Der Editormodus ist aktiv");
			$("#infobox").show(500, function() {
				//$("#infobox").delay(10000).hide(500);
			});
			e.preventDefault();
		} else if (e.ctrlKey && e.which == 121 && menu) {
			menu = false;
			$("#infobox").html("Der Editormodus ist aktiv");
			$("#infobox").hide(500, function() {

			});
			e.preventDefault();
		}

		if( e.ctrlKey && e.which == 100 && menu ){
			e.preventDefault();
			var start = $("#article").prop("selectionStart");
			var end = $("#article").prop("selectionEnd");
			if(start == end){
				var text = $("#article").val();
				var c = start;
				var c1 = c -1;
				var c2 = c;
				
				while( text.charAt(c1) != '[' ) --c1;
				while( text.charAt(c2) != ']' ) c2++;
			
				var pre = text.substring(0,c1);
				var post = text.substring(c2 +1,text.length);
				var ges = pre + post;

				$("#article").val(ges);
				$("#article").prop("selectionStart",c1);
				$("#article").prop("selectionEnd",c1);
			} else {
				alert("There is an error");
			}
		}
	});

	$("#save").click(function() {
		$.ajax({
			type : "POST",
			url : "/kb/mongo/editarticle",
			data : {
				"text" : $("#article").val(),
				"title" : $("#title").val()
			},
			success : function() {
				showMassage()
			}
		});
	});

	addCommand('w', "warn", "warn");
	addCommand('s', "suc", "suc");
	addCommand('i', "info", "info");
	addCommand('e', "err", "err");
	addCommand('t', "tex", "tex");
	addCommand('b', "b", "b");
	addCommand('l',"list","list");
	addCommand('ö',"entry","entry");
	addCommand('h',"h","h1");
});

function showMassage() {
	$("#infobox2").show(500, function() {
		$("#infobox2").delay(1000).hide(500);
	});
}

function addCommand(key, button, code) {
	var processCommand = function() {
		var selstart = $("#article").prop("selectionStart");
		var selend = $("#article").prop("selectionEnd");
		var len = $("#article").val().length;
		var codelen = code.length + 2;

		var teil1 = $("#article").val().substr(0, selstart);
		var insert = "[" + code + "][/" + code + "]";
		var teil2 = $("#article").val().substr(selstart, len);

		$("#article").val(teil1 + insert + teil2);
		$("#article").prop("selectionStart", selstart + codelen)
		$("#article").prop("selectionEnd", selend + codelen)
	}

	$(document).keypress(function(e) {
		if (e.ctrlKey && menu && e.which == key.charCodeAt()) {
			e.preventDefault();
			processCommand()
		}
	})
	$("#" + button).click(processCommand)
}
