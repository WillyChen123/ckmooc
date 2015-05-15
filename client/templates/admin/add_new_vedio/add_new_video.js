Template.addNewVideo.events({
  'submit form': function(e) {
    e.preventDefault();

    var video = {
      course_id: $(e.target).find('[name=course_id]').val(),
      chapter: $(e.target).find('[name=chapter]').val(),
      video_name: $(e.target).find('[name=video_name]').val(),
      video_url: $(e.target).find('[name=video_url]').val()
    };

    var stop=false;
    Meteor.call('newVideoInsert', video, function(error, result) {
      if (error){
        return alert(error.reason);
        stop=true;
       }

      if(result.nothing){
      	alert('Please Enter something.');
      	stop=true;
      }

      if (stop===false){
      Router.go('adminSetting');
  	}
    });
    
  }
});