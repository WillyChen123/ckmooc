Courses = new Mongo.Collection('courses');
Tags = new Mongo.Collection('tags');
Videos = new Mongo.Collection('videos');
Authors = new Mongo.Collection('authors');


Meteor.methods({
  newCourseInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      course_tag: String,
      course_name: String,
      course_id: String,
      course_introduce: String,
      course_sample: String,
    });

    if(postAttributes.course_tag===''){
      return{
        no_course_tag:true
      }
    }
    if(postAttributes.course_name===''){
      return{
        no_course_name:true
      }
    }    
    if(postAttributes.course_id===''){
      return{
        no_course_id:true
      }
    }
    if(postAttributes.course_sample===''){
      return{
        no_course_sample:true
      }
    }
    if(postAttributes.course_introduce===''){
      return{
        no_course_introduce:true
      }
    }
    

    var postWithSameID = Courses.findOne({course_id: postAttributes.course_id});
    if (postWithSameID) {
      return {
        postExists: true,
        course_id: postWithSameID.course_id
      }
    }

    var user = Meteor.user();
    var course = _.extend(postAttributes, {
      userId: user._id,
      author: user.username, 
      submitted: new Date()
    });
    var postId = Courses.insert(course);
    return {
      course_id: postAttributes.course_id
    };
  },

  newTagInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      tag_name: String
    });

    if(postAttributes.tag_name===''){
      return{
        no_tag_name:true
      }
    }

    var postWithSameID = Tags.findOne({tag_name: postAttributes.tag_name});
    if (postWithSameID) {
      return {
        postExists: true,
        tag_name: postWithSameID.tag_name
      }
    }

    var user = Meteor.user();
    var tag = _.extend(postAttributes, {
      userId: user._id,
      author: user.username, 
      submitted: new Date()
    });
    var tagId = Tags.insert(tag);
    return {
      tag_name: postAttributes.tag_name
    };
  },

  newVideoInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      course_id: String,
      chapter: String,
      video_name: String,
      video_url: String
    });

    if(postAttributes.course_id===''){
      return{
        no_course_id:true
      }
    }
    if(postAttributes.chapter===''){
      return{
        no_chapter:true
      }
    }
    if(postAttributes.video_name===''){
      return{
        no_video_name:true
      }
    }
    if(postAttributes.video_url===''){
      return{
        no_video_url:true
      }
    }

    var postWithSameID = Videos.findOne({video_url: postAttributes.video_url});
    if (postWithSameID) {
      return {
        postExists: true
      }
    }

    var user = Meteor.user();
    var video = _.extend(postAttributes, {
      userId: user._id,
      author: user.username, 
      submitted: new Date()
    });
    var courseId = Videos.insert(video);
    return {
      course_id: postAttributes.course_id
    };
  },

  authorInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {      
      author_name: String,
      author_introduce: String
    });

    if(postAttributes.author_name===''||postAttributes.author_introduce===''){
      return{
        nothing:true
      }
    }

    var user = Meteor.user();
    var author = _.extend(postAttributes, {
      userId: user._id,
      author: user.username, 
      submitted: new Date()
    });
    same = Authors.findOne({userId:Meteor.user()._id});
    if (same){
      var authorId = Authors.update({userId:Meteor.user()._id},author);
    }else{
      var authorId = Authors.insert(author);
    }
    return {
      author_name: postAttributes.author_name
    };
  },

  deleteCourse:function(courseId){
    check(Meteor.userId(), String);
    check(courseId,String);


    course = Courses.remove({course_id:courseId,userId:Meteor.userId()});
    video = Videos.remove({course_id:courseId,userId:Meteor.userId()});
    return course;

  },

  deleteVideo:function(videoUrl){
    check(Meteor.userId(), String);
    check(videoUrl,String);

    video = Videos.remove({video_url:videoUrl,userId:Meteor.userId()});
    return video;

  }
});