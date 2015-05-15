Meteor.publish('courses',function(){
	return Courses.find();
});

Meteor.publish('tags',function(){
	return Tags.find();
}); 

Meteor.publish('videos',function(){
	return Videos.find();
}); 