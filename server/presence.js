Meteor.methods({
  setPresence: function(playerId, status) {
    PlayersList.update({ _id: playerId }, {
      $set: {
        status: status,
        timestamp: new Date()
      }
    }, function(err, res){
      if (err) return err;
      AuthLog.insert({ playerId: playerId, timestamp: new Date(), status: status});
    });
  }
});
