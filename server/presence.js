AuthLog = new Mongo.Collection('authLog');

// Used to monitor the user's presence by having the client subscribe,
// then watching the socket for disconnect
Meteor.publish('presence', function(playerId){

  this.onStop(function(){
    console.log("Stopping connection to ", playerId);
    Meteor.call('setPresence', playerId, 'offline');
  });

  //What is this used for?
  return AuthLog.findOne({ _id: playerId }, { sort: { timestamp: - 1 } });
})

Meteor.methods({
  // Update the player card and set status. Then record the transaction in
  // a separate log

  setPresence: function(playerId, status) {
    PlayersList.update({ _id: playerId }, {
      $set: {
        status: status,
        timestamp: new Date()
      }
    }, function(err, res){
      if (err) return err;
      //AuthLog.insert({ playerId: playerId, status: status, timestamp: new Date() });
    });
  }

});
