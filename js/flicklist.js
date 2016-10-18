

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "543342f02785f67a3d5fdd709af26588" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			// TODO 2
			model.browseItems = response.results; //which replaces everytime with the new movies page

			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			//model.browseItems = response;
			// invoke the callback function that was passed in.

			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists

  	$('#section-watchlist ul').innerHTML = ''; //both of these styles clear the html before you put anything in it
	$('section-browse ul').empty();

  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  	model.watchlistItems.forEach(function(movie) {
	  $('#section-watchlist ul').append('<li>' + movie.title + '</li>');
  });

  // for each movie on the current browse list,
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
		var listItem = $("<li>" + movie.title + "</li>");
		//var listItem = $("<li><p></p></li>").text(movie.title);
		//var listItem = $( "section.section-browse" ).text("<li>" + movie.title + "</li>");
		//console.log(listItem);
		$("#section-browse ul").append(listItem);
		//$('#section-browse ul').append("<li><p>" + listItem + "</p></li>")
		var button = $('<button>Add to Watch List</button>');
		//$('#section-browse ul').append('<li>' + movie.title + '</li>');


		button.click(function() {
			model.watchlistItems.push(movie);
			render();
});

		//var listItem = $('<li><span>' + movie.title + '</span></li>'); //MIKE'S
		listItem.append(button);
		//$('#section-browse ul').append(listItem); //MIKE'S
	});



		// TODO 4
		// the list item should include a button that says "Add to Watchlist"


		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again


}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
