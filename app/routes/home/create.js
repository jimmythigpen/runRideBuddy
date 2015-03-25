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
     this.controller.set('model.activity.activityType', 'activity');
    // var date = new Date().toISOString();
    // console.log(this.get('model.activity'));
    // date = date.substring(0, date.length - 1);

    //  this.controllet.set('model.activity.activityDate', '2015-03-30T19:00:00.000');
    }
   },
 });
