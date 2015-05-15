Template.addNewCourse.helpers({
  course_tags: function() {
    return Tags.find();
  }

});

Template.addNewCourse.events({
  'submit form': function(e) {
    e.preventDefault();

    var course = {
      course_name: $(e.target).find('[name=course_name]').val(),
      course_id: $(e.target).find('[name=course_id]').val()
    };

    var stop=false;
    Meteor.call('newCourseInsert', course, function(error, result) {
      if (error){
        return alert(error.reason);
        stop=true;
       }
      if (result.postExists){
        alert('This link has already been posted.');
        stop=true;
    }


      if(result.nothing){
      	alert('Please Enter something.');
      	stop=true;
      }

      if (stop===false){
      Router.go('addNewVideo',{_id: result.course_id});
  	}
    });
    
  }
});