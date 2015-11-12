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

	    //Find out if it's an existing player
	    var playerExists = PlayersList.findOne({
	    	name:name,
	    	bnetid:bnetid
	    });

	    if (playerExists) {
	    	Session.setPersistent('playeridSession',playerExists._id);
	    	var playerSession = Session.get('playeridSession'); 
   			
	   		//Update record
	  		PlayersList.update({_id: playerSession}, {$set: {
	  				race: race,
	  				loginDate: new Date()
	  			}
	  		});

	  		Materialize.toast('Existing ID found', 4000);
	    }
	    else {
		    PlayersList.insert({
		        name: name,
		        bnetid: bnetid,
		        race: race,
		        rank: "Unknown Rank",
		        description: "I'm a fun and honest " + race + " looking for another funny, kind, and honest " + race +" to make sweet Archon Mode magic with.",
		        createdAt: new Date(),
		        loginDate: new Date()
			}, function(error){
				if(error){
			      console.log(error.reason); // Output error if submission fails
			    } else {
			      //lookup id of record entered
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
	},
	'click .logout': function(){
		Session.clear('playeridSession')
		Materialize.toast('Logged out', 4000);
  	},
  	'click .edit': function(){
  		$('#modalEdit').openModal();
  	}
});

//Helpers
Template.playerform.helpers({
	'player': function(){
		var playerSession = Session.get('playeridSession');

        return PlayersList.findOne({_id:playerSession});
    }
});








