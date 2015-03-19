import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return new Ember.RSVP.hash({
      activity: this.store.find('activity', params.activity_id),
      users: this.store.findAll('user'),
    });
  }
});
