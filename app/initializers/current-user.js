import ajax from "ic-ajax";
import Ember from "ember";
import Session from "simple-auth/session";

export function initialize(container, application) {

  application.inject('adapter', 'session', 'simple-auth-session:main');

  Session.reopen({

    setCurrentUser: Ember.immediateObserver('sessionToken', function() {

      var token = this.get('sessionToken');
      if (this.get('isAuthenticated') && !Ember.isEmpty(token)) {
        var store = container.lookup('store:main');

        ajax('https://api.parse.com/1/users/me').then(function(response) {
          // console.log(response);
          response.id = response.objectId;
          delete response.objectId;
          delete response.sessionToken;
          // console.log(response);
          // debugger;
          var user = store.push('user', response);
          this.set('currentUser', user);
        }.bind(this));
      }
    })
  });
}

export default {
  name: 'current-user',
  initialize: initialize
};
