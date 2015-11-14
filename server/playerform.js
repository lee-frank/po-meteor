Meteor.methods({
	'updateRace': function(playerid,race) {
		var results = PlayersList.update({_id: playerid}, {$set: {
			race: race,
			loginDate: new Date()
			}
		});

		// Set the presence of the inserted user
		Meteor.call('setPresence', playerid, 'online');
	},

	'insertNewUser': function(name,bnetid,race) {
    var results = PlayersList.insert({
        name: name,
        bnetid: bnetid,
        race: race,
        rank: "Unknown Rank",
        description: "I'm a fun and honest " + race + " looking for another funny, kind, and honest " + race + " to make sweet Archon Mode magic with.",
        createdAt: new Date(),
        loginDate: new Date()
		});

		// Set the presence of the inserted user
		Meteor.call('setPresence', results, 'online');
	}
});
