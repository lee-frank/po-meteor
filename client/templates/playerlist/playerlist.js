Template.playerlist.onRendered(function() {
	$('ul.tabs').tabs();
});

Template.playerlist.onCreated(function() {
	var instance = this;

	//Part of reactive variable package
	//Like Sessions, but can be limited in scope ex: template specific
	instance.loaded = new ReactiveVar(0);
  	instance.limit = new ReactiveVar(5);

  	console.log("instance.loaded:" + instance.loaded);
  	console.log("instance.limit:" + instance.limit);

	// will re-run when the "limit" reactive variables changes
  	instance.autorun(function () {
	    var limit = instance.limit.get();

	    console.log("Asking for "+limit+" posts…")

	    // subscribe to the 'thePlayers' publication
	    var subscription = instance.subscribe('thePlayers', limit);

	    // if subscription is ready, set limit to newLimit
	    if (subscription.ready()) {
	      console.log("> Received "+limit+" posts. \n\n")
	      instance.loaded.set(limit);
	    } else {
	      console.log("> Subscription is not ready yet. \n\n");
	    }
    });
});

Template.playerlist.events({	
	'click #race-selector li a': function(event){
		var race = event.currentTarget.id;
		Session.set('racefilter', race); //sent to findCard helper
	},
	'click .loadmore': function (event) {
	   	event.preventDefault();
    	var limit = Template.instance().limit.get();

	    // increase limit by 5 and update it
	    limit += 5;
	    Template.instance().limit.set(limit);
  	}
})

Template.playerlist.helpers({
	'filterCards': function(){
    	Session.setDefault('racefilter', "All"); //Only runs if no session exists

    	var race = Session.get('racefilter');

    	if (race !== "All") {
    		return PlayersList.find({race: race}, {sort: {createdAt: -1}});	
    	} else {
    		return PlayersList.find({}, {sort: {createdAt: -1}});	
    	}
    },
    'playerCount':function(){
    	//publish-counts package
    	//gets the total count for that cursor (number of documents in collection)
    	var totalPlayers = Counts.get('counter'); 
    	var limit = Template.instance().limit.get();

    	console.log("This is the playercount limit:" + limit);

		if (limit < totalPlayers) {
			return true;
     	}
     	else {
     		return false;
     	}
    }
});




