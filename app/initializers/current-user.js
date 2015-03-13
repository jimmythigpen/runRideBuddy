import Ember from "ember";
import Session from "simple-auth/session";

export function initialize(container) {
  Session.reopen({
    setCurrentUser: function() {
      var id = this.get("objectId");

      if (!Ember.isEmpty(id)) {
        return container.lookup("service:store").find("user", id).then(function(user) {
          this.set("currentUser", user);
        }.bind(this));
      }
    }.observes("objectId")
  });
}

export default {
  name: 'current-user',
  initialize: initialize
};
