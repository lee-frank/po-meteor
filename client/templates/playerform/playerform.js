Meteor.subscribe('thePlayers');

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
		var playerExists = PlayersList.findOne({name:name,bnetid:bnetid});

	    if (playerExists) {
	    	Session.setPersistent('playeridSession',playerExists._id);
	    	var playerSession = Session.get('playeridSession');

	   		//Update last login and race
	   		Meteor.call('updateRace', playerSession, race);

	  		Materialize.toast('Existing ID found', 4000);
	    } else {
	    	//insert new user
			Meteor.call('insertNewUser', name, bnetid, race, function(err, data) {
				if (err) {
				    console.log(err);
	   			}
				var playerid = PlayersList.findOne({name:name,bnetid:bnetid});

				//set persistent session of user
	    		Session.setPersistent('playeridSession',playerid._id);
	    		Materialize.toast('Player card entered', 4000);
			});
		}
	},
	'click .logout': function(){
    Meteor.call('setPresence', Session.get('playeridSession'), 'loggedOut');
		Session.clear('playeridSession');
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
