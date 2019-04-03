//REQUIRE .env FILE
require("dotenv").config();

// set variables
//REQUEST REQUEST
var request = require("request");

//REQUEST MOMENT
var moment = require("moment")

//REQUIRE FILE SYSTEM
var fs = require("fs");

//LINK KEYS PAGE
var keys = require("./keys.js");

//INITIALIZE SPOTIFY
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//OMD AND BANDS IN TOWN'S API'S
var omdb = (keys.omdb);
var bandsintown = (keys.bandsintown);

// TAKE USER COMMAND AND INPUT
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join("");

// APP LOGIC
function userCommand(userInput, userQuery) {
    //make decision
 switch (userInput)  {
  case "concert-this":
    concertThis();
    break;
  case 'spotify-this':
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis(); 
    break;
  case "do-this":
    doThis(userQuery);  
    break;
  default: 
    console.log("I don't understand");
   break;
}
}

userCommand(userInput, userQuery);

function concertThis() {
    console.log("\n -----\n\nSEARCHING FOR.....${userQuery}'s next show......");
 //USE REQUEST AS OUR QUERY URL USING USER QUERY VARIABLE AS THE PARAMETERS OF OUR SEARCH 
    request("https://rest.bandsintown.com/artists/"+ userQuery + "/events?app_id=" + bandsintown, function (error, response, body) { 
        if (!error && response.statusCode === 200){
            // CAPTURE DATA AND USE JSON TO FORMAT
            var useBand = JSON.parse(body);
            // PARSE DATA AND USE FOR LOOP TO ACCESS PATHS TO DATA
            if (userBand.length > 0) {
                for (i=0;i < 1; i++) {

                // CONSOLE DESIRED DATA USING E6 SYNTAX
                console.log(`\nBA DA BOP!  That's for you...\n\nArtist: ${userBand[i].lineup[0]} \nVenue: ${userBand[i].venue.name}\nVenue Location: ${userBand[i].venue.latitude},${userBand[i].venue.longitude}\nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)
 
                //MOMENT.JS TO FORMAT THE DATE MM/DD/YYYY
                var concertDAta = moment(userBand[i].datetime).format("MM//DD/YYYY hh:00 A");
                console.log("Date and Time: ${concertDate}\n\n - - - -"); 
                };
            } else {
                console.log("Band or concert not found");
    
            };
        };
    });

};function spotifyThisSong() {
    console.log('\n - - - -  -\n\nSEARCHING FOR..."${userQuery}"');

    //IF USER QUERY NOT FOUND, PASS VALUE OF "JAY Z"
    if (!userQuery) {
        userQuery = "hard knock life jay z"
    };


    //SPOTITY SEARCH QUERY FORMAT
    spotify.search({
        type: "track",
        query: userQuery,
        limit: 1
    }, function(error,data) {
        if (error) {
           return console.log("Error occurred: " + error); 
        }
     //COLLECT SELECTED DATA IN AN ARRAY
        var spotifyArr = data.track.items;

        for (i=0;i <spotifyArr.length; 1++) {
            console.log(`\nBA DA BOP!  That's for you...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
        };

    });
}

    function movieThis() {
        console.log('\n - - - - - \n\nSEARCHING FOR... "$(userQuery)"');
        if (!userQuery) {
            userQuery = "meet the parents";
      };

      // REQUEST USING OMDB API
      request("http://www.omdbapi.com/?i=" + userQuery + "&apikey=ad4933d6",function (error, response,body) {

      var userMovie = JSON.parse(body);

     //    // BECAUSE THE ROTTEN TOMATOES RATING WAS NESTED IT WAS NECESSARY TO CAPTURE ITS VALUES IN AN ARRAY TO CREATE A PATH
     let ratingsArr = userMovie.Ratings;
     if (ratingsArr.length > 2) {}

     if (!error && response.statusCode === 200) {
         console.log(`\nBA DA BOP!  That's for you...\n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}\nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}\nLanguage: ${userMovie.Language}\nPlot: ${userMovie.Plot}\n\n- - - - -`)
     } else {
         return console.log("Movie able to be found. Error:" + error)
     };
 })
};

function doThis() {
    // UTILIZE THE BUILT IN READFILE METHOD TO ACCESS RANDOM.TXT
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // CATCH DATA AND USE THE .SPLIT() METHOD TO SEPARATE OBJECTS WITHIN OUR NEW ARRAY
        let dataArr = data.split(",");

        // TAKE OBJECTS FROM RANDOM.TXT TO PASS AS PARAMETERS
        userInput = dataArr[0];
        userQuery = dataArr[1];
        // CALL OUR FUNCTION WITH OUR NEW PARAMETERS...
        userCommand(userInput, userQuery);
    });
};

   
   
   
   
   





