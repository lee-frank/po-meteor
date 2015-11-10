Template.profilecard.helpers({
    'findOneCard': function(){
		var playerSession = Session.get('playeridSession');
        return PlayersList.findOne({_id:playerSession});
    }
});
