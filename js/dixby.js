//Declaring Global variables
var command = process.argv[2];

//Requests
var request = require("request");
var fs = require("file-system");
var twitterPackage = require("twitter");
var spotifyPackage = require("spotify");

//Requiring Twitter keys from keys.js
var keys = require("./keys.js");

//Switch statement to be executed after user command selection
function dixby(command, run){
	switch(command){
		case "my-tweets":
			twitter(run);
			break;
		case "spotify-this-song":
			spotify(run);
			break;
		case "movie-this":
			omdb(run);
			break;
		case "do-what-it-says":
			justDoIt(run);
			break;
		default:
			console.log("Enter my-tweets to see the user's 20 last tweets;" + 
			"spotify-this-song <song name> to read info about the song;" + 
			"movie-this <movie name> to get the title's information or" + 
			"<do-what-it-says> if you're feeling lucky!");
	}
};

//Grab  Twitter keys from keys.js file
var client = new twitterPackage(keys.twitterKeys);

//Setting up parameters for Twitter request
var params = {screen_name: "AusekAna", count: 20};

//Twitter function
function twitter(){
	//Callback to obtain Twitter Stream
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
	  //Conditional allowing user command to display 20 latest tweets
	  if (!error) {
	  	//Looping through the tweets array
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log(JSON.stringify(tweets[i].text));
	    	
	    }
	  }
	  

	});
};

//Function for Spotify
function spotify(song){
	if(!song){
		song = "Call Me Maybe";
	};
	//Spotify callback
	spotifyPackage.search({type: "track", query: song}, function(error, data) {
	    if (!error) {
	    	//Logging all keys about the song input
	    	console.log(data.tracks.items[0].artists[0].name);
	    	console.log(data.tracks.items[0].name);
	    	console.log(data.tracks.items[0].artists[0].external_urls.spotify);
	    	console.log(data.tracks.items[0].album.name);
	    }
	    else{
	    	console.log("Error!");
	    }
	    
	});
};

//Function for OMDB
function omdb(movie){
	if (!movie) {
		movie = "Mr. Nobody";
	};
	//OMDB request
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json", function(error, response, body){
		//Parse the response to make it accessible
		var fullInfo = JSON.parse(body);
		if (!error) {
			//Logging all the keys about movie input
			console.log(fullInfo.Title);
			console.log(fullInfo.Year);
			console.log(fullInfo.imdbRating);
			console.log(fullInfo.Country);
			console.log(fullInfo.Language);
			console.log(fullInfo.Plot);
			console.log(fullInfo.Actors);
			console.log(fullInfo.tomatoRating);
			console.log(fullInfo.tomatoURL);
			
		}
		else{
			console.log("Error!");
		}
		
	});
}

//Function justDoIt for node dixby.js do-what-it-says
function justDoIt(){
	fs.readFile("random.txt", "utf8", function(error, data){
		spotify(data);
		if(error){
			throw error;
		}
	});
};

//Logging the data from terminal to external "log.txt" file
function logIt(data){
	fs.appendFile("log.txt", data, "utf8", function(error){
			if (error) {
				console.log(error);
			}
			// else{
			// 	console.log(data);
			// }	
	});
};


//Listening to user command and case
dixby(command, process.argv[3]);
logIt();





