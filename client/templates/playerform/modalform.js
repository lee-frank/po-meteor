//initialize jquery plugins
// Template.modalform.onRendered(function() {
//     $('textarea#text').characterCounter(); 
// });

//Events
Template.modalform.events({
  	'click #update': function(){
  		//get playersession
  		var playerid = Session.get('playeridSession');

  		//pull values from fields
	    var name = $('[name="name"]').val();
	    var bnetid = $('[name="bnetid"]').val();
	    var description = $('[name="description"]').val();
	    var race = $('[name="race"]').val();
	    var rank = $('[name="rank"]').val();

	    //Update record
      Meteor.call('updatePlayer',playerid,name,bnetid,description,race,rank, function(err, data) {
        if (err) {
            console.log(err);
        } 
          Session.set('getPlayerDataFlag',true);
          Materialize.toast('Your info has been updated', 4000);
      });
  	},
  	'click #delete': function(){
  		var playerid = Session.get('playeridSession');

  		//Delete record from collection and clear session 
  		Meteor.call('removePlayer',playerid, function(err, data) {
        if (err) {
            console.log(err);
        } 
        Session.clear('playeridSession');
        Session.clear('playerData');
        Materialize.toast('Player card deleted', 4000);
      });
  	}
});

//Helpers
Template.modalform.helpers({
    'selectRace': function(race){  //set default selected for race when editing
      var playerData = Session.get('playerData');
  		return (race === playerData.race) ? 'selected' : '';
    },
    'selectRank': function(rank){  //set default selected for rank when editing
    	var playerData = Session.get('playerData');
		  return (rank === playerData.rank) ? 'selected' : '';
    }
});








