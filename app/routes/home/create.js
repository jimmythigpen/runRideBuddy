import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
     return this.store.createRecord('activity', {
       activityOwner: this.get('session.currentUser')
     });
   },

   actions: {
     createActivity: function(){
       this.modelFor('home.create').save().then(function() {
         this.transitionTo('home');
       }.bind(this));
     }
   }
 });
