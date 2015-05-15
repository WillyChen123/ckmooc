Courses = new Mongo.Collection('courses');
Tags = new Mongo.Collection('tags');
Videos = new Mongo.Collection('videos');

Meteor.methods({
  newCourseInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      course_name: String,
      course_id: String
    });

    if(postAttributes.course_id==='' ||  postAttributes.course_name==''){
      return{
        nothing:true
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
      submitted: new Date(),
      course_tag: 'aaa'
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

    if(postAttributes.tag_id===''){
      return{
        nothing:true
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

    if(postAttributes.course_id===''||postAttributes.chapter===''||
      postAttributes.video_name===''||postAttributes.video_url===''){
      return{
        nothing:true
      }
    }

    // var postWithSameID = Videos.findOne({tag_name: postAttributes.tag_name});
    // if (postWithSameID) {
    //   return {
    //     postExists: true,
    //     course_id: postWithSameID.course_id
    //   }
    // }

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
  }
});