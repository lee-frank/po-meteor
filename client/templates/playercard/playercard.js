Template.playercard.helpers({
    'findCard': function(){
        return PlayersList.find({}, {sort: {createdAt: -1}});
    }
});

Template.profilecard.helpers({
    'findOneCard': function(){
		var playerSession = Session.get('playeridSession');
        return PlayersList.findOne({_id:playerSession});
    }
});


