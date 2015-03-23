import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5],
  finishMarker: [23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34, 34.5, 35, 35.5, 36, 36.5],

  activityFriends: function(){
    var ownerId = this.get('model.activity.activityOwner.objectId');
    return this.get('model.activity.activityFriends').rejectBy('objectId', ownerId);
  }.property('model.activity.activityFriends.@each'),

  // fullname: function() {
  //   return this.get('model.users');
  //   // console.log(users);
  //   // var fullname;
  //
  //   // fullname = users.firstName + users.lastName;
  //
  //   // return fullname;
  //
  // }.property('model.users.@each'),


  summary: function() {
    var activity = this.get('model.activity');
    var summary;

    if (activity.activityStyle === "One-Way") {
      summary = "and ends at mile";
    } else {
      summary = "and the turnaround is at mile";
    }

    return summary;
  }.property('model.activity'),

  distance: function() {
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

    if (distance > 1) {
      distance = (distance + " Miles");
    } else {
      distance = (distance + " Mile");
    }

    return distance;
  }.property('model.activity'),

  // firstName: function() {
  //   console.log('HELLLO');
  //   // console.log(this.get('session.currentUser'));
  //   // console.log(this.get('model.activityOwner'));
  //   return 'hello';
  // }.property('model.activityOwner', 'session.currentUser'),

  actions: {
    complete: function() {
       var self = this;
       var currentUser = this.get('session.currentUser.id');
       var activity = {};
       var activityId = this.get('model.activity');
       activity.completedActivities = {
         __op: "AddRelation",
         objects: [{__type:"Pointer",className:"activity",objectId: activityId.id}],
       };
       ajax({
         url:  "https://api.parse.com/1/users/" + currentUser,
         type: "PUT",
         data: JSON.stringify(activity),
         contentType: 'application/json'
       }).then(function() {
         activityId.leave(self.get('session.content.currentUser')).then(function(){
           self.transitionToRoute('home.index');
         });
       });
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

    leave: function() {
      var activity = this.get('model.activity');
      activity.leave(this.get('session.content.currentUser')).then(function(){
        this.transitionToRoute('home.index');
      }.bind(this));
    },

    delete: function() {
      this.get('model.activity').destroy().then(function(){
        this.transitionToRoute('home.index');
      }.bind(this));
    },

  },

});
