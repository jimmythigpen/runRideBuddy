import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5],
  finishMarker: [23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5],

  activityFriends: function(){
    var ownerId = this.get('session.currentUser.id');
    return this.get('model.activity.activityFriends').rejectBy('id', ownerId);
  }.property('model.activity.activityFriends.@each'),

  // activityDate: function(){
  //
  //   var date = new Date().toISOString();
  //   date = date.substring(0, date.length - 8);
  //   return date;
  //
  // }.property('model.activity.activityDate'),

  actions: {
    saveNew: function(){
      var newActivity = this.get('model.activity');
      var distance;

      if (newActivity.activityStart < newActivity.activityFinish) {
        distance = newActivity.activityFinish - newActivity.activityStart;
      } else {
        distance = newActivity.activityStart - newActivity.activityFinish;
      }

      if (newActivity.activityStyle === "Round-Trip") {
        distance = distance * 2;
      }

      this.set('model.activity.distance', distance);
      this.get('model.activity').save();
    },

    removeFriend: function(friend) {
      var activity = this.get('model.activity');
      activity.activityFriends.removeObject(friend);
    },
  },

  friendSelected: function(){
    var activity = this.get('model.activity');
    var friend = this.get('selectedFriend');
    if(friend) {
      activity.activityFriends.pushObject(friend);
      this.set('selectedFriend', null);
    }
  }.observes('selectedFriend')

});
