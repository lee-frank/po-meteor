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
		    }
		});
	    console.log(name);
	    console.log(bnetid);
	    console.log(race);
	},
	'click .logout': function(){
		Session.clear('playeridSession')
		console.log("logged out");
  	},
  	'click .edit': function(){
  		$('#modalEdit').openModal();
  	},
  	'click #update': function(){
  		var playerSession = Session.get('playeridSession');

	    var name = $('[name="name"]').val();
	    var bnetid = $('[name="bnetid"]').val();
	    var description = $('[name="description"]').val();
	    var race = $('[name="race"]').val();
	    var rank = $('[name="rank"]').val();

  		PlayersList.update({_id: playerSession}, {$set: {
  				name: name,
  				bnetid: bnetid,
  				description: description,
  				race: race,
  				rank: rank
  			}
  		});
  	}
});

//Helpers
Template.playerform.helpers({
	'player': function(){
		var playerSession = Session.get('playeridSession');

        return PlayersList.findOne({_id:playerSession});
    }
});








