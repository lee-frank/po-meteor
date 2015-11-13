//This function is available globally
UI.registerHelper('formatTime', function(context, options) {
  if(context) {
	return moment(context).startOf('minute').fromNow(); 
  }
});


