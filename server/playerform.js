Meteor.methods({
	'updateRace': function(playerid,race) {
		var results = PlayersList.update({_id: playerid}, {$set: {
			race: race,
			loginDate: new Date()
			}
		});
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
		//if set callback it'll be async
		return results; //returns to client for setting sessionID.
	},
	'findUser':function(name,bnetid) {
		return PlayersList.findOne({name:name,bnetid:bnetid});
	},
	'findUserById':function(sessionId){
		return PlayersList.findOne({_id:sessionId});
	}
});
