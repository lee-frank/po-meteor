Meteor.publish('thePlayers', function() {
	return PlayersList.find({});
});

Meteor.publish('findPlayer', function(name,bnetid) {
	return PlayersList.find({});
});

