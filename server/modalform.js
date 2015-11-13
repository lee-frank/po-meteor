Meteor.methods({
	'updatePlayer': function(playerid,name,bnetid,description,race,rank) {
		PlayersList.update({_id: playerid}, {$set: {
  				name: name,
  				bnetid: bnetid,
  				description: description,
  				race: race,
  				rank: rank
			}
		});
	},
	'removePlayer':function(playerid) {
		PlayersList.remove({_id: playerid});
	}
});