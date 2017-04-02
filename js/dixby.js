//Global variables
var command = process.argv[2];
var TwitterPackage = require("twitter");
var keys = require("./keys.js");

//Switch statement for all functions

//Grab  Twitter keys from keys.js file
var client = new TwitterPackage(keys.twitterKeys);

//Setting up parameters for Twitter request
var params = {screen_name: "AusekAna", count: 20};

//Callback to get Twitter Stream
client.get("statuses/user_timeline", params, function(error, tweets, response) {
  
  //Conditional allowing user command to display 20 latest tweets
  if (command === "my-tweets") {

  	//Looping through the tweets array
    for (var i = 0; i < tweets.length; i++) {
    	console.log(JSON.stringify(tweets[i].text));
    }
  }else {
  	throw error;
  }
  


});

//console.log(JSON.stringify(response));

//Function for Spotify

//Function for OMDB