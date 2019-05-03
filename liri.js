// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require('moment');

var command = process.argv[2];
var artist = process.argv.slice(3).join("");
var song = process.argv.slice(3);
var movie = process.argv.slice(3).join("+");


if (command === "concert-this") {
  concertThis(artist)
}
if (command === "spotify-this-song") {
  spotifyThis(song)
}
if (command === "movie-this") {
  movieThis(movie)
}
if (command === "do-what-it-says") {
  doThis()
}
else if (command === undefined) {
  console.log("                                            ")
  console.log("Please choose one of the following commands and try again:")
  console.log("                                            ")
  console.log("concert-this: Find concerts for your favorite artist")
  console.log("spotify-this-song: Look up your favorite song")
  console.log("movie-this: Find information on your favorite movie")
  console.log("do-what-it-says: read a command from a text file")
  console.log("                                            ")

}

// console.log(argument)

function concertThis(artist) {
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp%22").then(
    function (response) {
      // Then we print out the imdbRating
      for (key of response.data) {
        // console.log(key.venue.name);
        console.log("Venue:      " + key.venue.name)
        console.log("Location:   " + key.venue.city + ", " + key.venue.country)
        console.log("Date:       " + moment(key.datetime).format("L"))
        console.log("\n")
        console.log("=======================================")
        console.log("\n")

      }


    }
  );
}


function spotifyThis(song) {
  if (song == "") {
    song = "the sign base of ace";
  }

  // Spotify API request (if an object is returned, output the first search result's artist(s), song, preview link, and album)
  spotify.search({ type: 'track', query: song }, function (error, data) {
    if (error) { // if error
      console.log('Error occurred: ' + error);
    } else { // if no error
      // For loop is for when a track has multiple artists
      for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
        if (i === 0) {
          console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
        } else {
          console.log("              " + data.tracks.items[0].artists[i].name);
        }
      }
      console.log("Song:         " + data.tracks.items[0].name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
      console.log("Album:        " + data.tracks.items[0].album.name);
    }


  });
}

function movieThis(movie) {
  if (movie === "") {
    movie = "mr nobody";
  }
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      // console.log(response.data);
      console.log("* Title of the movie:         " + (response.data.Title));
      console.log("* Year the movie came out:    " + (response.data.Year));
      console.log("* IMDB Rating of the movie:   " + (response.data.imdbRating));
      for (var i = 0; i < response.data.Ratings.length; i++) {
        if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
          console.log("* Rotten Tomatoes Rating:     " + response.data.Ratings[i].Value);
        }
      }
      console.log("* Country produced:           " + (response.data.Country));
      console.log("* Language of the movie:      " + (response.data.Language));
      console.log("* Plot of the movie:          " + (response.data.Plot));
      console.log("* Actors in the movie:        " + (response.data.Actors));

    }
  );
}

function doThis() {
  fs.readFile("random.txt", "utf-8", function (error, data) {
    var command;
    var query;

    // If there is a comma, then we will split the string from file in order to differentiate between the command and query
    // 	--> if there is no comma, then only the command is considered (my-tweets)
    if (data.indexOf(",") !== -1) {
      var dataArr = data.split(",");
      command = dataArr[0];
      query = dataArr[1];
    } else {
      command = data;
    }

    // After reading the command from the file, decides which app function to run
    if (command === "spotify-this-song") {
      spotifyThis(query);
    } else if (command === "movie-this") {
      movieThis(query);
    }
    else if (command === "concert-this") {
      concertThis(query);
    }
    else { // Use case where the command is not recognized
      console.log("Command from file is not a valid command! Please try again.")
    }
  });
}






// Then run a request with axios to the OMDB API with the movie specified

