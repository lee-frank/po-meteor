Meteor.publish('thePlayers', function() { 
	return PlayersList.find({});
});