Meteor.autorun(function(){
  // Check if session still exists
  var playerSession = Session.get('playeridSession');
  console.log("Autorun start");
  
  if (playerSession) {
  	console.log("playerSession found");
	Meteor.call('setPresence', playerSession, 'online');
	Meteor.subscribe('presence', playerSession);
  }
});


