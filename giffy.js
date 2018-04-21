// array to hold strings
var cirqueActs = ["trapeze", "cyr", "juggling", "acrobats", "clowns", "contortion", "contact juggling"];

//function displays buttons of the strings in cirqueActs
function renderButtons() {
    $("#circusButtons").empty();

    // Loops through the array of movies
    for (var i = 0; i < cirqueActs.length; i++) {

        var a = $("<button>");
        a.addClass("act");
        a.attr("data-name", cirqueActs[i]);
        a.text(cirqueActs[i]);
        $("#circusButtons").append(a);
    }
}

//function adds acts to array and calls renderButtons
$("#addAct").on("click", function (event) {
    event.preventDefault();

    var act = $("#circusInput").val().trim();
    cirqueActs.push(act);
    console.log(cirqueActs);

    renderButtons();

});

//function pulls gifs from the api and pushes to html
function displayGIF() {
    var act = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + act + "&api_key=ePxTMTlzc9y6QL3VenZa9Rx1CxU2D744&limit=10";

    // Creates AJAX call for the specific act button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        for (var j = 0; j < results.length; j++) {
            var actDiv = $("<div class='tile'>");

            var rating = results[j].rating;
            var p = $("<p>").text("Rating: " + rating);

            var actGIF = $("<img>");
            actGIF.attr("data-still", results[j].images.fixed_height_still.url);
            actGIF.attr("data-animate", results[j].images.fixed_height.url);
            actGIF.attr("src", results[j].images.fixed_height_still.url);
            actGIF.attr("data-state", "still");
            actGIF.attr("class", "gif");

            actDiv.append(p);
            actDiv.prepend(actGIF);

            $("#circusActs").prepend(actDiv);
        }

    });

}

$(document).on("click", ".gif", changeState);
//wasn't working as a $(".gif").on('click', function()) but this works
function changeState() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

//pulls the gifs and displays them once the button is clicked
$(document).on("click", ".act", displayGIF);

renderButtons();