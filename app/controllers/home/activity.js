import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
  finishMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],

    owner: function(){
      return (this.session.isAuthenticated && this.get('session.content.currentUser.id') === this.get('model.activity.activityOwner.objectId'));
    }.property(),

    // activityFriends: function() {
    //   if (this.get('session.currentUser.firstName') === this.get('model.activity.activityOwner.firstName')) {
    //     var owner = this.get('model.activity.activityOwner');
    //     this.get('model.activity.activityFriends').filter(function(friend) {
    //       console.log(friend.firstName = owner.firstName);
    //       return friend.firstName !== owner.firstName;
    //     });
    //   }
    // }.property(),

  actions: {
    edit: function(){
      this.set('isEditing', false);
    },

    save: function() {
      this.get('model.activity').save().then(function(){
        this.transitionToRoute('home.index');
      }.bind(this));
    },

    addFriend: function() {
      var activity = this.get('model.activity');
      var friend = this.get('selectedFriend');
      activity.addFriend(friend);
    },

    removeFriend: function(friend) {
      var activity = this.get('model.activity');
      activity.removeFriend(friend);
    },

    delete: function() {
      this.get('model.activity').destroy().then(function(){
        this.transitionToRoute('home.index');
      }.bind(this));
    },
  },

  isEditing: true,

});
