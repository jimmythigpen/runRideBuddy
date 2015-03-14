import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({

  find: function(name, id){
    return ajax("https://api.parse.com/1/users/" + id).then(function(user){
      user.id = user.objectId;
      delete user.objectId;
      delete user.sessionToken;
      return user;
    });
  }
});
