Template.deleteChooseCourse.events({
  'submit form': function(e) {
    e.preventDefault();

    var course_id = $(e.target).find('[name=course_id]').val();


      Router.go('/deleteVideo?_id='+course_id);
    
  }
});