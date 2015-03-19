import ajax from 'ic-ajax';
import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend({
  sessionToken: null,

  restore: function(data) {
    this.set('sessionToken', data.sessionToken);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if(!Ember.isEmpty(data.sessionToken)){
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function(credentials) {
    var token = credentials.sessionToken;
    if(token){ this.set('sessionToken', token); }
    var endpoint = token ? 'users/me' : 'login';
    var options = token ? {} : {
      data: {
        username: credentials.identification,
        password: credentials.password
      }
    };

    return ajax('https://api.parse.com/1/' + endpoint, options).then(function(response) {
      this.set('sessionToken', response.sessionToken);
      return {sessionToken: response.sessionToken};
    }.bind(this));
  },

  invalidate: function() {
    this.set('sessionToken', null);
    return Ember.RSVP.resolve();
  }
});
