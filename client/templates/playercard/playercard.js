Template.playercard.helpers({
    'findCard': function(){
        return PlayersList.find({}, {sort: {createdAt: -1}});
    }
});



