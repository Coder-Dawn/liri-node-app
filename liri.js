var fs = require('fs');
var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require ("spotify");
var request = require ("request");
var params = process.argv.slice(2);

switch(params [0]) {
	case "my-tweets":
		twitterStatus();
		break;
	case "spotify-this-song":
		if(params[1]) {
			spotifySong(params);
		}
			else{
				params[1] = "Whats my age again?"
				spotifySong(params);
			}
			break;
	case "movie-this":
		if (params[1]) {
			movieName(params[1] = "Mr. Nobody");
			break;
			case "do-what-it-says":
			readMe(params[1]);
			break;
		}
	function twitterStatus() {
		var client = new Twitter ({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
			access_token_key: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret
		});

	var params = {screen_name: 'ur_mom06'};
		client.get('statuses/user_timeline', params, function(error, tweets,response){
			if (!error)  {
				for (var i = 0; i< tweets.length; i++) {
	console.log(tweets[i].text);
}
}			
		});
	}	 else if (error) {
		console.log ("error);")
	}

	function spotifySong(params) {
		spotify.search ({ type: 'track', query: params[1]}, function(err, data) {
			if (err) {
				console.log('Error occured: ' + err);
				return;
			} else {
				for (var i=0; i < data.tracks.items.length; i++) {
					console.log("Song: " + data.tracks.items[i].name);
					console.log("Artist: " + data.tracks.items[i].artist[0].name);
					console.log("Album: "+ data.tracks.items[i].album.name);
					console.log("Link: "+ data.tracks.items[i].preview_url);
					console.log(" ");

					fs.appendFile("log.txt", "Song: " + data.tracks.items [i].name + "\r\n", function(err) {
						if (err) {
							return console.log (err);
						}
					});
				};
			}
		});
	}

	functi9n movieName( ){
		request("http://www.omdbapi.com/?t=" +params[1]+"&y=&plot=short&r=json", function(error, response, body) {
			if (!error && response.statusCode ==200) {
				body = JSON.parse(body);
				console.log("Title: "+body.Title);
				console.log("Year: " + body.Year);;
				console.log("imdb Rating: " + body.imdbRating);
				console.log("Country: " + body.Country);
				console.log("Language: " + body.Language);
				console.log("Plot: " + body.Plot);
				console.log("Actors: " + body.Actors);
				console.log("RottenTomatoes rating: " + body.tomatoRating);
				console.log("RottenTomatoes Link: " + body.tomatoURL);


				fs.appendFile("log.txt", "Title:  " + body.Title + "\r\n", function(err) {
					if (err) {
						return console.log (err);
					}
				});
			};
		});
	};

	function readMe( ){
		fs.readFile("random.txt", "utf8", function(error, data){
			var stringArray = data.split( ", ");
			spotifySong(stringArray);
		});
	};
