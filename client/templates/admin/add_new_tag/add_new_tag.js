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
        alert('This link has already been posted.');
        stop=true;
    }


      if(result.nothing){
      	alert('Please Enter something.');
      	stop=true;
      }

      if (stop===false){
      Router.go('adminSetting');
  	}
    });
    
  }
});