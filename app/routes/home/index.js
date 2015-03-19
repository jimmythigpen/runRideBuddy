import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    // console.log(this.session.content.currentUser);
    return this.store.findAll('activity');
  },
});
