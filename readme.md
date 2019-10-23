#Video of functionality: 
https://drive.google.com/file/d/1NbJlMJTbTrCUC_6FsgRFy5PL5fa8FcpY/view?usp=sharing

#Application Purpose: 
This app creates a 'Liri' bot which is run with Node.js.  The liri bot takes several commands and then queries node libraries to pull and display information.  The commands are as follows: 


##1. do-what-it-says: node liri.js do-what-it-says
Using the fs node package, this command pulls in the information from the random.txt file and then performs the command from that file. 


##2. concert-this: node liri.js concert-this <artist/band name here>
This command will search the Bands in Town Artist Events API for an artist.  It will find the next concert the artist is performing and let you know the name of the venue, the location and the date of the event.


##3. spotify-this:  node liri.js spotify-this-song '<song name here>'
This command uses the spotify node api package in order to retrieve song information.  This requires a spotify ID and secret which are stored in the .env file and retrieved with the keys.js file.  This is then exported to the liri.js file.   This retrieves and displays the artist(s), song name, a preview link of the song and the album the song is from.

The dotenv node package is used to set the enviornment variables through the global process.env object in node.  These values are meant to be specific to the computer that node is running on.  A .gitignore file is used to prevent the .env file and node modules from pushing to github.  This keeps the spotify secret and ID a secret.  In order to run this functionality, you will need to clone the app from github and supply your own .env file for it to work.  


##4. movie-this: 
How to run this command with node:  node liri.js movie-this '<movie name here>'
This command uses the axios node package to query the OMDB API for movie information.  It will retrieve and display the title of the movie, year it came out, IMDB and Rotten Tomatoes ratings, countries it was produced in, languages, plot of the movie and actors.

#Technologies Used: Javascript, Node.js (node packages: FS, axios, dotenv, moment, node-spotify-api )

#Brennen's Role in Development: All
