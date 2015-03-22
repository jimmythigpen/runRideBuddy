import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(){
    // console.log(this.get('session.currentUser'));
    return this.get('session.currentUser');
  }
});
