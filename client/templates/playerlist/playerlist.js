Template.playerlist.onRendered(function() {
	$('ul.tabs').tabs();
});

Template.playerlist.events({	
	'click #filter': function(event){
		console.log(event.currentTarget.text);
  	}
})

Template.playerlist.helpers({
    'findCard': function(){
        return PlayersList.find({}, {sort: {createdAt: -1}});
    }
});


