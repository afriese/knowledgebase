$(function(){
	$("#col-zutaten").removeClass("col-md-4").addClass("col-md-12");
		$("#col-zubereitung").hide();
		$("#col-zutaten").show();
	
	$("#zubereitung").click(function(){
		$("#zubereitung").addClass("active")
		$("#zutaten").removeClass("active")
		
		$("#col-zubereitung").removeClass("col-md-8").add("col-md-12")
		$("#col-zubereitung").show();
		$("#col-zutaten").hide();
	});
	$("#zutaten").click(function(){
		$("#zubereitung").removeClass("active")
		$("#zutaten").addClass("active")
		
		$("#col-zutaten").removeClass("col-md-4").addClass("col-md-12");
		$("#col-zubereitung").hide();
		$("#col-zutaten").show();
	});
	
	#
})
