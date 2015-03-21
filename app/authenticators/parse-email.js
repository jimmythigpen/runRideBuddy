import ajax from 'ic-ajax';
import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';

export default Base.extend({
  sessionToken: null,

  restore: function(data) {
    // console.log(data);
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
    // console.log(credentials);
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
      // console.log(response);
      response.id = response.objectId;
      delete response.objectId;
      this.set('currentUser', response);
      // console.log(this.get('currentUser.id'));

      this.set('sessionToken', response.sessionToken);
      return {sessionToken: response.sessionToken};
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
  }),

  // setCurrentUser: Ember.immediateObserver('currentUser', function() {
  //   return this.set('currentUser');
  //
  // })
});
