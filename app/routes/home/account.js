import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    // console.log(this.get('session.content'));
    //   return this.get('session.currentUser');
    return this.get('session.currentUser');
    }
});
