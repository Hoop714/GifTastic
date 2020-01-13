/**Declare Variables**/
var topics, newButton, newShow, queryURL, showName, results, rating, gifShow, state;

/**Starting shows arry**/
topics = ["The Simpsons", "Breaking Bad", "Friends", "Futurama"];

/**Create and Clear buttons on each reload**/
function makeButtons() {
	$("#buttons").html("");

	/** Loop through shows array to make each button **/
	for (var i=0; i<topics.length; i++) {
		newButton = $("<button>" + topics[i] + "</button>");
		newButton.attr("data-name", topics[i]);
		newButton.addClass("tvshows");
		$("#buttons").append(newButton);
	};
};

/**On-click event for adding new buttons**/
$("#add-show").on("click", function(event){
	event.preventDefault();
	/** Prevent new button if the input is blank **/
	if ($("#user-input").val() !== ""){
		newShow = $("#user-input").val();
		$("#user-input").val("");
		topics.push(newShow);
		makeButtons();
	}
});

/**Key-press event for adding new buttons from user input**/
$("#user-input").keypress(function(e){
	if (e.keyCode === 13 && $("#user-input").val() !== ""){
		newShow = $("#user-input").val();
		$("#user-input").val("");
		topics.push(newShow);
		makeButtons();
	}
})

/**Display gif function that includes AJAX request**/
function displayGifs(){
	$("#gifs").html("");

	showName = $(this).attr("data-name");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + showName + "&api_key=7yWWp89zKr3OvZfcBlWP0GZ6POxKBpIg&limit=10";
	
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		
		results = response.data;

		for(var j=0; j<results.length; j++){

			showDiv = $("<div class='show'>");
			$("#gifs").append(showDiv);

			rating = $("<div>Rating: " + results[j].rating + "</div>");

			gifShow = $("<img data-state='still' src='" + results[j].images.fixed_height_still.url + "'>");
			gifShow.attr("data-still", results[j].images.fixed_height_still.url);
			gifShow.attr("data-animate", results[j].images.fixed_height.url);
			gifShow.addClass("gif");

			showDiv.append(rating);
			showDiv.append(gifShow);
		};
	});
};

/**Function for start/stop gifs**/
function animateGif(){
	state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

/**Call functions for on-click events **/
makeButtons();
$(document).on("click", ".tvshows", displayGifs);
$(document).on("click", ".gif", animateGif);