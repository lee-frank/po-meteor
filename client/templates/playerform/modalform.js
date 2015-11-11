//initialize jquery plugins
Template.modalform.onRendered(function() {
    $('textarea#text').characterCounter();
});

//Events
Template.modalform.events({
  	'click #update': function(){
  		//get playersession
  		var playerSession = Session.get('playeridSession');

  		//pull values from fields
	    var name = $('[name="name"]').val();
	    var bnetid = $('[name="bnetid"]').val();
	    var description = $('[name="description"]').val();
	    var race = $('[name="race"]').val();
	    var rank = $('[name="rank"]').val();

	    //Update record
  		PlayersList.update({_id: playerSession}, {$set: {
  				name: name,
  				bnetid: bnetid,
  				description: description,
  				race: race,
  				rank: rank
  			}
  		});

  		Materialize.toast('Your info has been updated', 4000);
  	},
  	'click #delete': function(){
  		var playerSession = Session.get('playeridSession');

  		//Delete record from collection and clear session 
  		PlayersList.remove({_id: playerSession});
  		Session.clear('playeridSession')

  		Materialize.toast('Player card deleted', 4000);
  	}
});

//Helpers
Template.modalform.helpers({
	'player': function(){
		var playerSession = Session.get('playeridSession');

        return PlayersList.findOne({_id:playerSession});
    },
    'selectRace': function(race){  //set default selected for race when editing
		var playerSession = Session.get('playeridSession');
		var player = PlayersList.findOne({_id:playerSession});
		return playerSession && (race == player.race) ? 'selected' : '';
    },
    'selectRank': function(rank){  //set default selected for rank when editing
    	var playerSession = Session.get('playeridSession');
    	var player = PlayersList.findOne({_id:playerSession});
    	
    	//meteor guard (checked playerSession exists)
		return playerSession && (rank == player.rank) ? 'selected' : '';
    }
});








