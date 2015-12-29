Meteor.methods({
	'updatePlayer': function(playerid,name,bnetid,description,race,rank,server) {
		PlayersList.update({_id: playerid}, {$set: {
  				name: name,
  				bnetid: bnetid,
  				description: description,
  				race: race,
  				rank: rank,
					server: server
			}
		});
	},
	'removePlayer':function(playerid) {
		PlayersList.remove({_id: playerid});
	}
});
