import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateAccount: function() {
      var data = this.get('model');
      return ajax({
        url:  "https://api.parse.com/1/users/" + data.id,
        type: "PUT",
        data: JSON.stringify({firstName: data.firstName, lastName: data.lastName, password: data.password, username: data.username, email: data.username}),
        contentType: 'application/json'
      }).then(function(){
        this.transitionToRoute('home.index');
      }.bind(this));
    },


  imageUpload: function() {
    var data = this.get('model');
    var image = this.get('image');
    console.log(this.get('image'));
    ajax({
      url:  "https://api.parse.com/1/users/" + data.id,
      type: "POST",
      // files: JSON.stringify({profilePic: image}),
      data: JSON.stringify({profilePic: image}),
      contentType: 'image/jpeg'
    });
  }

}


});
