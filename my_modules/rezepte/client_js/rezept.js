$(function(){
	$("#beides").click(function(){
		$("#beides").addClass("active")
		$("#zubereitung").removeClass("active")
		$("#zutaten").removeClass("active")
		
		$("#col-zutaten").removeClass("col-md-12").addClass("col-md-4");
		$("#col-zutaten").show();
		
		$("#col-zubereitung").removeClass("col-md-12").addClass("col-md-8")
		$("#col-zubereitung").show();
	});
	$("#zubereitung").click(function(){
		$("#beides").removeClass("active")
		$("#zubereitung").addClass("active")
		$("#zutaten").removeClass("active")
		
		$("#col-zubereitung").removeClass("col-md-8").add("col-md-12")
		$("#col-zubereitung").show();
		$("#col-zutaten").hide();
	});
	$("#zutaten").click(function(){
		$("#beides").removeClass("active")
		$("#zubereitung").removeClass("active")
		$("#zutaten").addClass("active")
		
		$("#col-zutaten").removeClass("col-md-4").addClass("col-md-12");
		$("#col-zubereitung").hide();
		$("#col-zutaten").show();
	});
})
