////////////////////////////////
// Variables and Requirements //
////////////////////////////////

require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require("fs");
moment().format();
let operation = process.argv[2];
let input = process.argv[3];



///////////////////// 
// do-what-it-says //
/////////////////////

if(operation === 'do-what-it-says') {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // Console log the data 
        console.log(data);
      
        // Split the data by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // Set the new values for the operation and input variables and then call the eval function with the new params.

         operation = dataArr[0];
         input = dataArr[1];
         evalOperation();
      
      });
      
}


//Call evalOperation function in the case where the operation is not 'do-what-it-says'
evalOperation();


//I put the spotify-this, movie-this and concert-this operations inside a function called evalOperation so that I could 
//first have it evaluate the do-what-it-says case and change the operation and input and then call the function to evaluate it.

function evalOperation() {
/////////////////////
// Spotify Content //
/////////////////////

if(operation === 'spotify-this-song') {

    if(!input){
        input = 'The Sign Ace of Base';
    }

    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
       let Data = data.tracks.items[0]; 

        // console.log(Data);
     

       let artistList = '';
      
       for(let i = 0; i < Data.artists.length; i++){
           artistList += Data.artists[i].name + ' ';
       }

       console.log('Artists: ' + artistList);

       console.log('Song Name: ' + Data.name);

       console.log('Album Name: ' + Data.album.name);

       console.log('Preview URL: ' + Data.preview_url);
      
       

})};

//////////////////////////
// Movie-this: OMDB API //
//////////////////////////

if(operation === 'movie-this'){
    if(!input){
        input = 'Mr. Nobody';
    }

    axios.get('http://www.omdbapi.com/?apikey=trilogy&limit=1&t='+input).then(
        function(response) {

            let Data = response.data;
            let rottenScore = '';

            console.log('Title: ' + Data.Title);
            console.log('Release Year: ' + Data.Year);
            console.log('IMDB Rating: ' + Data.imdbRating);

            for(let i =0; i < Data.Ratings.length; i++) {
                if(Data.Ratings[i].Source === 'Rotten Tomatoes'){
                     rottenScore = Data.Ratings[i].Value;
                    
                }
            } 

            console.log('Rotten Tomatoes Rating: ' + rottenScore );
            console.log('Country Where Movie Was Produced: ' + Data.Country);
            console.log('Language of the movie: ' + Data.Language);
            console.log('Movie Plot: ' + Data.Plot);
            console.log('Actors: ' + Data.Actors);
           

        
            
        }
    )

};

/////////////////////////////////////
// Concert-this: Bands in Town API //
/////////////////////////////////////

if(operation === 'concert-this'){
    axios.get('https://rest.bandsintown.com/artists/'+input+'/events?app_id=codingbootcamp').then(
        function(response) { 
            let Data = response.data[0];

            console.log('Venue Name: ' + Data.venue.name);
            console.log('Venue Location ' +Data.venue.city + ' ' + Data.venue.region + ' ' + Data.venue.country); 

            let eventDate = Data.datetime;
            eventDate = moment().utc().format('MM/DD/YYYY');
            console.log('Event Date: ' + eventDate);
        }
    )};

};
