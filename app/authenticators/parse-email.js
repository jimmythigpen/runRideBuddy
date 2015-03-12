import ajax from 'ic-ajax';
import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend({
  sessionToken: null,

  restore: function(data) {
    this.set('sessionToken', data.sessionToken);
    return ajax('https://api.parse.com/1/users/me');
  },

  authenticate: function(credentials) {
    var token = credentials.sessionToken;
    var endpoint = token ? 'users/me' : 'login';
    var options = token ? {} : {
      data: {
        username: credentials.identification,
        password: credentials.password
      }
    };

    return ajax('https://api.parse.com/1/' + endpoint, options).then(function(response) {
      this.set('sessionToken', response.sessionToken);
      return response;
    }.bind(this));
  },

  invalidate: function() {
    this.set('sessionToken', null);
    return Ember.RSVP.resolve();
  },

  _setupHeaders: Ember.immediateObserver('sessionToken', function(){
    var token = this.get('sessionToken');
    Ember.$.ajaxSetup({
      headers: {
        'X-Parse-Session-Token': token
      }
    });
  })
});
