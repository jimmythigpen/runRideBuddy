import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateAccount: function() {
      var data = this.get('model');
      return ajax({
        url:  "https://api.parse.com/1/users/" + data.id,
        type: "PUT",
        data: JSON.stringify({firstName: data.firstName, lastName: data.lastName, password: data.password}),
        contentType: 'application/json'
      });
    }
  }
});
