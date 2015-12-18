Template.deleteVideo.events({
  'submit form': function(e) {
    e.preventDefault();

    var video_url = $(e.target).find('[name=video_id]').val();


    var stop=false;
    if(confirm("Delete?")){


      Meteor.call('deleteVideo', video_url, function(error, result) {
        if (error){
          return alert(error.reason);
          stop=true;
         }

        // if(result.nothing){
        //   return alert('Please Choose');
        //   stop=true;
        // }

        if (stop===false){
        Router.go('adminSetting');
    	     }
      });
    }else{
      Router.go('adminSetting');
    }
    
  }
});