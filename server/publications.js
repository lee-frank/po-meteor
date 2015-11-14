Meteor.publish('thePlayers', function() {
	return PlayersList.find({});
});

// Meteor.publish('presence', function(){
// 	return Presence.find({});
// })
