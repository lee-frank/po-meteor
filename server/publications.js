Meteor.publish('players', function() { 
	return PlayersList.find({});
});