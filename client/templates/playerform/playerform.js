// Template.playerform.onCreated(function () {
//      this.subscribe('thePlayers');
// });

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

   	//1. Finds User
   	//2. If found, set sessionId, updateRace
   	//3. If not found, insertNewUser. Find newUser and set sessionID
 	Meteor.call('findUser',name,bnetid, function(err, data) {
		if (err) {	
			console.log(err); 
		}

		var playerExists = data;

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
				else { 
					//set persistent session of user
    				Session.setPersistent('playeridSession', data);
    				Materialize.toast('Player card entered', 4000);
				}
			});
		}
		Session.set('getPlayerDataFlag',true);
	});

	},
	'click .logout': function() {
		Session.clear('playeridSession');
		Session.clear('playerData');
		Materialize.toast('Logged out', 4000);
	},
	'click .edit': function(){
		$('#modalEdit').openModal();
	}
});

//Helpers
Template.playerform.helpers({
  'playerData': function(){
	var playerSession = Session.get('playeridSession');
	Session.setDefault('getPlayerDataFlag',true);

	var getPlayerDataFlag = Session.get('getPlayerDataFlag');
	
	if (getPlayerDataFlag) {
		Meteor.call('findUserById',playerSession, function(err,data) {
			if (err) {
		    	console.log(err);
			} else { 
				Session.setPersistent('playerData',data);
				Session.set('getPlayerDataFlag',false);
				console.log('getPlayerDataFlag ran');
			}
		});
	}
	
	return Session.get('playerData');
  },
  'loggedIn': function(){ //check if playeridSession exists (logged in)
  	var playerSession = Session.get('playeridSession');

	if (playerSession) { 
		return true; 
	}
  }
});
