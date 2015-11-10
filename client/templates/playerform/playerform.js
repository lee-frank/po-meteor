//initialize jquery plugins
Template.playerform.onRendered(function() {
    $('.modal-trigger').leanModal();
    $('textarea#text').characterCounter();
});

//Events
Template.playerform.events({
	'submit form': function(event){
	    event.preventDefault();

	    var name = $('[name="name"]').val();
	    var bnetid = $('[name="bnetid"]').val();
	    var race = $('[name="race"]').val();

	    var playerExists = PlayersList.findOne({
	    	name:name,
	    	bnetid:bnetid
	    });

	    if (playerExists) {
	    	Session.setPersistent('playeridSession',playerExists._id);

   			Materialize.toast('Existing ID found', 4000);
	    }
	    else {
		    PlayersList.insert({
	        name: name,
	        bnetid: bnetid,
	        race: race,
	        rank: "Unknown Rank",
	        description: "I'm a fun and honest " + race + " looking for another funny, kind, and honest " + race +" to make sweet Archon Mode magic with.",
	        createdAt: new Date()
			}, function(error){
				if(error){
			      console.log(error.reason); // Output error if submission fails
			    } else {
			      //lookup document of record entered
			      var playerid = PlayersList.findOne({
			      	name: name,
			      	bnetid: bnetid,
			      	race: race
			      });
			      
			      //set persistent session of user
			      Session.setPersistent('playeridSession',playerid._id);

			      Materialize.toast('Player card entered', 4000);
			    }
			});
	    }
	    
	    console.log(name);
	    console.log(bnetid);
	    console.log(race);
	},
	'click .logout': function(){
		Session.clear('playeridSession')
		Materialize.toast('Logged out', 4000);
  	},
  	'click .edit': function(){
  		$('#modalEdit').openModal();
  	},
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
Template.playerform.helpers({
	'player': function(){
		var playerSession = Session.get('playeridSession');

        return PlayersList.findOne({_id:playerSession});
    },
    'selectRace': function(race){  //set default selected for race when editing
    	var playerSession = Session.get('playeridSession');
    	var player = PlayersList.findOne({_id:playerSession});

		return (race == player.race) ? 'selected' : '';
    },
    'selectRank': function(rank){  //set default selected for rank when editing
    	var playerSession = Session.get('playeridSession');
    	var player = PlayersList.findOne({_id:playerSession});

		return (rank == player.rank) ? 'selected' : '';
    }
});








