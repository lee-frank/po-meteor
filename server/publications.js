Meteor.publish('thePlayers', function(limit) {
	//publish-counts package
	//sets observer on cursor (enable total count for that cursor)
	Counts.publish(this, 'counter', PlayersList.find()); 
	return PlayersList.find({},{limit:limit});
});


