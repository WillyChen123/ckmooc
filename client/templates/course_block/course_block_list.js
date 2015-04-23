var CourseList =[
	{coursename:"foo", students:3},
	{coursename:"foo", students:3},
	{coursename:"foo", students:3},
	{coursename:"foo", students:3},
	{coursename:"foo", students:3},
	{coursename:"foo", students:3},
	{coursename:"foo", students:3},
	{coursename:"foo", students:3},
	{coursename:"foo", students:3},

]

Template.courseBlockList.helpers({
	course_blocks:function(){
		return Courses.find();
	}

});