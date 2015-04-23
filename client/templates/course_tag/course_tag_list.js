var courseData = [
  {
    item: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  }, 
  {
    item: 'Meteor',
    url: 'http://meteor.com'
  }, 
  {
    item: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  }
];

Template.courseTagList.helpers({
	course_tags : courseData 
});