Template.addNewTag.events({
  'submit form': function(e) {
    e.preventDefault();

    var tag = {
      tag_name: $(e.target).find('[name=tag_name]').val()
    };

    var stop=false;
    Meteor.call('newTagInsert', tag, function(error, result) {
      if (error){
        return alert(error.reason);
        stop=true;
       }
      if (result.postExists){
        alert('This Tag has already been created.');
        stop=true;
    }


      if(result.no_tag_name){
      	alert('Please Enter Tag Name.');
      	stop=true;
      }

      if (stop===false){
      Router.go('adminSetting');
  	}
    });
    
  }
});