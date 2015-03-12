import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    register: function(){
      // var self = this;
      var data = this.getProperties('firstName', 'lastName', 'username', 'password');
      data.email = data.username;
      ajax({
        url:  "https://api.parse.com/1/users",
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json'
      }).then(function(response){
        this.session.authenticate('authenticator:parse-email', {
          sessionToken: response.sessionToken
        });
      }.bind(this));
  },
}

});
