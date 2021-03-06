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
    },
    waitOn: function() { return Meteor.subscribe('courses');}
});

Router.route('/course/:courseId?', {
  name: 'courseEachIndex',
  data: function() {
    var courseId = this.params.courseId;
    courseData = { course_lists:Videos.find({course_id: this.params.courseId},{sort: {submitted: 1}}),
                    course_introduces:Courses.findOne({course_id: this.params.courseId}),
                    author: function(){
                      uid = Courses.findOne({course_id:courseId}).userId;
                      return(Authors.findOne({userId:uid}));
                    },
                    video: Router.current().params.query.video,
                    video_name: function(){
                      uvideo = Router.current().params.query.video;
                      return(Videos.findOne({video_url:uvideo}));
                    },
                  };
    return courseData;
    },
    waitOn: function() { return Meteor.subscribe('videos');}
});


Router.route('/login', {
  name: 'login'
});

Router.route('/adminSetting',{name:'adminSetting'});

Router.route('/authorintroduce',{
  name:'authorIntroduce',
  data:function(){
    data = {
      author:Authors.findOne({userId:Meteor.user()._id})
    }
    return data;
  },
  waitOn: function() { return Meteor.subscribe('authors');}
});

Router.route('/addNewTag',{name:'addNewTag'});

Router.route('/addNewCourse',{name:'addNewCourse'});

Router.route('/addNewVideo',{
  name:'addNewVideo',
  data:function(){
    data = {
        course_ids : Courses.find({userId:Meteor.user()._id})
    };
    return data;
  },
  waitOn: function() { return Meteor.subscribe('courses');}

});

Router.route('/deleteCourse',{
  name:'deleteCourse',
  data:function(){
    data = {
      courses:Courses.find({userId:Meteor.userId()})
    };
    return data;
  }
});

Router.route('/deleteChooseCourse',{
  name:'deleteChooseCourse',
  data:function(){
    data = {
      courses:Courses.find({userId:Meteor.userId()})
    };
    return data;
  }
});

Router.route('/deleteVideo',{
  name:'deleteVideo',
  data:function(){
    data = {
      videos:Videos.find({userId:Meteor.userId(),course_id:Router.current().params.query._id})
    };
    return data;
  }
});

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

Router.onBeforeAction(requireLogin, {only: 'courseEachIndex'});
Router.onBeforeAction(requireLogin, {only: 'adminSetting'});
Router.onBeforeAction(requireLogin, {only: 'addNewTag'});
Router.onBeforeAction(requireLogin, {only: 'addNewCourse'});
Router.onBeforeAction(requireLogin, {only: 'addNewVideo'});
Router.onBeforeAction(requireLogin, {only: 'deleteCourse'});
Router.onBeforeAction(requireLogin, {only: 'deleteChooseCourse'});
Router.onBeforeAction(requireLogin, {only: 'deleteVideo'});


// Router.route('/loading',{
//   name:'loading'
// })