Meteor.autorun(function(){
  // Check if session still exists
  var playerSession = Session.get('playeridSession');
  if (playerSession) {
    Meteor.call('setPresence', playerSession, 'online');
    Meteor.subscribe('presence', playerSession);
  }
});
