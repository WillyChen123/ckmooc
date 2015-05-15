Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('courses'); }
});

Router.route('/', {name: 'courseIndex'});

Router.route('/tag/:tagId', {
  name: 'courseTagIndex',
  data: function() {
    courseTagData = { course_blocks:Courses.find({course_tag: this.params.tagId},{sort: {submitted: -1}})};
    return courseTagData;
    }
});

Router.route('/course/:courseId', {
  name: 'courseEachIndex',
  data: function() {
    courseData = { course_lists:Videos.find({course_id: this.params.courseId},{sort: {submitted: 1}})};
    return courseData;
    }
});

Router.route('/login', {
  name: 'login'
});

Router.route('/adminSetting',{name:'adminSetting'});

Router.route('/addNewTag',{name:'addNewTag'});
Router.route('/addNewCourse',{name:'addNewCourse'});
Router.route('/addNewVideo',{name:'addNewVideo'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'courseEachIndex'});

Router.onBeforeAction(requireLogin, {only: 'adminSetting'});
Router.onBeforeAction(requireLogin, {only: 'addNewTag'});
Router.onBeforeAction(requireLogin, {only: 'addNewCourse'});
Router.onBeforeAction(requireLogin, {only: 'addNewVideo'});