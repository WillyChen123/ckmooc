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

      if(result.no_course_id){
      	alert('Please Choose Course ID.');
      	stop=true;
      }
      if(result.no_chapter){
        alert('Please Enter Chapter.');
        stop=true;
      }
      if(result.no_video_name){
        alert('Please Enter Video Name.');
        stop=true;
      }
      if(result.no_video_url){
        alert('Please Enter Video URL.');
        stop=true;
      }

      if(result.postExists){
        alert('This Video URL has already been created.');
        stop=true;
      }

      if (stop===false){
      Router.go('adminSetting');
  	}
    });
    
  }
});