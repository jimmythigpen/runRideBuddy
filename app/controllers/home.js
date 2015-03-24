import Ember from 'ember';

export default Ember.Controller.extend({

actions: {
  openModal: function() {
    var modal = Ember.View.views['modal-about'];
    modal.send('toggleModal');
  },
 }
});
