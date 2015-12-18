Template.authorIntroduce.events({
  'submit form': function(e) {
    e.preventDefault();

    var author = {      
      author_name: $(e.target).find('[name=author_name]').val(),
      author_introduce: $(e.target).find('[name=author_introduce]').val()
    };

    var stop=false;
    Meteor.call('authorInsert', author, function(error, result) {
      if (error){
        return alert(error.reason);
        stop=true;
       }

      if(result.nothing){
      	alert('Please Enter Name and Introduction.');
      	stop=true;
      }

      if (stop===false){
      Router.go('adminSetting');
  	}
    });
    
  }
});