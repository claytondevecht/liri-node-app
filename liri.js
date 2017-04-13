var keys = require('./keys.js');
var request = require('fs');
var spotify = require('spotify');
var twitter = require('twitter');

var command = process.argv[2];
var input = process.argv[3];

var consumerKey = (keys.twitterKeys.consumer_key);
var secretKey = (keys.twitterKeys.consumer_secret);
var accessToken = (keys.twitterKeys.access_token_key);
var secretToken = (keys.twitterKeys.access_token_secret);


var liriCommand = function(command, input) {
	if (command === "movie-this") {
		if (input === undefined) {
			input = "Mr.Nobody"
		}

		request("http://www.omdbapi.com/?t=" + input, function (error, response, body) {
	 	console.log("Title: " + JSON.parse(body).Title);
	 	console.log("Rating: " + JSON.parse(body).imdbRating);
	 	console.log("Country: " + JSON.parse(body).Country);
	 	console.log("Language: " + JSON.parse(body).Language);
	 	console.log("Plot: " + JSON.parse(body).Plot);
	 	console.log("Actors: " + JSON.parse(body).Actors);
	 	console.log("Ratings: " + JSON.parse(body).Ratings[1].Value);
	 	console.log("URl: http://www.imdb.com/title/" + JSON.parse(body).imdbID);
		});

	} else if (command === 'spotify-this-song') {
		if (input === undefined) {
			input = '"The Sign" by Ace of Base'
		};
		spotify.search({type: 'track', query: input}, function(err, data) {
			if (err) {
				console.log('Error: ' + err);
			} else {
				console.log('Artist: ' + data.tracks.items[0].artists[0].name);
				console.log('Song: ' + data.tracks.items[0].name);
				console.log('Preview: ' + data.tracks.items[0].preview_url);
				console.log('Album: ' + data.tracks.items[0].album.name);
			}
		});
	} else if (command === 'my-tweets') {
		user = new twitter ({
			consumer_key: consumerKey,
			consumer_secret: secretKey, 
			access_token_key: accessToken,
			access_token_secret: secretToken
		});
		user.get('status/user_timeline', {screen_name: 'cdevecht1', count: 20}, function (error, response, tweets) {
			for (i = 0; i < tweets.length; i++) {
				console.log("=========");
				console.log(tweets[i].text);
				console.log("=========");
			}
		});			
	} else if (command === 'do-what-it-says') {
		fs.readFile('random.txt', 'utf8', function(err, data) {

			data = data.split(',');
			command = data[0];
			input = data[1];
			console.log(command);
			console.log(input);
		});		
		
	} else {
			console.log('error');
	}	
}

liriCommand(command, input);