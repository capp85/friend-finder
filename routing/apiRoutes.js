//Import data from the file in /app/data/friends.js
var friends = require('../app/data/friends');

//ROUTING

module.exports = function(app) {

  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Requests
  //  the best match
  app.post('/api/friends', function(req, res) {
		//  user input turning it into an object
	  var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
	};

	// Take's the result of the user's survey POST and parse it
	var userData = req.body;
	var userScores = userData["scores[]"];
	//console.log(userData);

	// The variable used to calculate the difference b/n the user's scores and the scores of each user
	var totalDifference = 0;

	//looping through the friends array of objects to get each friends score
	for (var i = 0; i < friends.length - 1; i++) {
			//console.log(friends[i].name);
			totalDifference = 0;

			//looping through friends score and users score then calculating the difference between the two and pushes that to the "total difference" variable listed above

			for (var j = 0; j < 10; j++) {
					// calculates the difference between the scores and sums them into the totalDifference
				//	console.log(totalDifference, userScores[j], friends[i].name + "hey")

					totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
					// If the differences is less then the differences of the current "best match"
					if (totalDifference <= bestMatch.friendDifference) {

							// Resets the "bestMatch" to be the new friend. 
							bestMatch.name = friends[i].name;
							bestMatch.photo = friends[i].photo;
							bestMatch.friendDifference = totalDifference;
					}
			}
	}

	// The push method uses to save user's data to the database
	friends.push(userData);

	//res.json method will return a JSON data with the user's match which was looped through friends array. 
	res.json(bestMatch);
});
};