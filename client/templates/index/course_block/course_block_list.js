Template.courseBlockList.helpers({
	course_blocks: function() {
		return Courses.find({},{sort: {submitted: -1}});
	}

});

//Can Use
// Template.courseBlockList.helpers({
// 	course_blocks: function() {
// 		return Courses.find({course_tag:tag},{sort: {submitted: -1}});
// 	}

// });