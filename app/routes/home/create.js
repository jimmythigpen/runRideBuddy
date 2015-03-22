import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return new Ember.RSVP.hash({
      activity: this.store.createRecord('activity', {
        activityOwner: this.get('session.currentUser'),
        activityFriends: [this.get('session.currentUser')],
      }),
      users: this.store.findAll('user'),
     });
   },

  actions: {

   didTransition: function() {
     // console.log(this.get(p));
     this.controller.set('model.activity.activityType', 'activity');
    }
   },
 });
