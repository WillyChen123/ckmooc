Template.deleteCourse.events({
  'submit form': function(e) {
    e.preventDefault();

    var course_id = $(e.target).find('[name=course_id]').val();


    var stop=false;
    if(confirm("Delete?")){


      Meteor.call('deleteCourse', course_id, function(error, result) {
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