Template.playerlist.onRendered(function() {
	$('ul.tabs').tabs();
});

Template.playerlist.events({	
	'click #race-selector li a': function(event){
		var race = event.currentTarget.id;
		Session.set('racefilter', race); //sent to findCard helper
  	}
})

Template.playerlist.helpers({
    'findCard': function(){
    	Session.setDefault('racefilter', "All"); //Only runs if no session exists

		var race = Session.get('racefilter');

		if (race != "All") {
			return PlayersList.find({race: race}, {sort: {createdAt: -1}});	
		} else {
	      	return PlayersList.find({}, {sort: {createdAt: -1}});	
		}
    }
});


