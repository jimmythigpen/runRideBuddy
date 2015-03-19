import Ember from 'ember';

 // export default Ember.Route.extend({
 //  model: function(){
 //    // console.log(this.get('session.content'));
 //    // console.log(this.get('session.currentUser'));
 //     return this.store.createRecord('activity', {
 //       activityOwner: this.get('session.currentUser')
 //     });
 //   },
 // });

export default Ember.Route.extend({
  model: function(){
    // console.log(this.get('session.content'));
    return new Ember.RSVP.hash({
      activity: this.store.createRecord('activity', {
        activityOwner: this.get('session.currentUser'),
        activityFriends: [this.get('session.currentUser')],
      }),
      users: this.store.findAll('user'),
     });
   },
 });
