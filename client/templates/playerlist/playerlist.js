Template.playerlist.onRendered(function() {
	$('ul.tabs').tabs();
});


Template.playerlist.helpers({
    'findCard': function(){
        return PlayersList.find({}, {sort: {createdAt: -1}});
    }
});


