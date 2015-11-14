Meteor.autorun(function(){
  if (Meteor.status().connected){
    Session.set('online', true);
  }
});
