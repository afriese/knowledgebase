$(function() {

	function Genre(data) {
		var self = this;

		self.name = data.name;
		self.id = data.id;

	}

	function Movie(data) {
		var self = this;

		self.backdrop_path = data.backdrop_path;
		self.original_title = data.original_title;
		self.poster_path = "http://image.tmdb.org/t/p/w500" + data.poster_path;
		console.log(self.original_title + " " + self.poster_path)
	}

	function GenreModel() {
		var self = this;

		self.genres = ko.observableArray([]);
		self.movies = ko.observableArray([]);

		$.getJSON("https://api.themoviedb.org/3/genre/movie/list?api_key=e3e1ba44da417f0112b02354940d26d7", function(allData) {
			var mappedGenre = $.map(allData.genres, function(item) {
				return new Genre(item)
			});
			self.genres(mappedGenre);
		});

		$.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=e3e1ba44da417f0112b02354940d26d7&sort_by=release_date.desc&page=1&vote_count.gte=5", function(allData) {
			var mappedMovies = $.map(allData.results, function(item) {
				return new Movie(item)
			});
			self.movies(mappedMovies);
		});
	}


	ko.applyBindings(new GenreModel());
})

(function($){
    $('.row-fluid ul.thumbnails li.span6:nth-child(2n + 3)').css('margin-left','0px');
    $('.row-fluid ul.thumbnails li.span4:nth-child(3n + 4)').css('margin-left','0px');
    $('.row-fluid ul.thumbnails li.span3:nth-child(4n + 5)').css('margin-left','0px'); 
})(jQuery);