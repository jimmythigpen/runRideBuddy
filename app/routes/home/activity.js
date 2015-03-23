import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    return new Ember.RSVP.hash({
      activity: this.store.find('activity', params.activity_id),
      users: this.store.findAll('user'),
    });
  },

  actions: {
    // willTransition: function() {
    //   // console.log(this.get(p));
    //   this.controller.set('createLabel', 'activity');
    // },

    didTransition: function() {
      // console.log(this.get('session.currentUser'));
      this.controller.set('owner',
      this.get('session.currentUser.id') === (this.currentModel.activity.activityOwner.objectId));

      this.controller.set('editable',
      this.get('session.currentUser.id') !== (this.currentModel.activity.activityOwner.objectId));
      

   }
  },

});
