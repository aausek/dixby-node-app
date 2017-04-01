//Require Twitter Package
var TwitterPackage = require("twitter");
var client = require("./keys.js");

//Grab  Twitter keys from keys.js file
var userKeys = client.twitterKeys
console.log(userKeys);

//Callback to get Twitter Stream
userKeys.stream("statuses/filter", {track: "javascript"}, function(stream){
	stream.on("data", function(tweet){
		console.log(event && event.text);
	});
	stream.on("error", function(error){
		throw error;
	});
});


