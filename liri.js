require("dotenv").config();

/////////////////////
// Spotify Content //
/////////////////////

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

let operation = process.argv[2];
let input = process.argv[3];

if(!input){
    input = 'The Sign Ace of Base';
}

if(operation === 'spotify-this-song') {

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
