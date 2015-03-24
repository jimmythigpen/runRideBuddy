import Ember from 'ember';
import layout from '../templates/components/about-modal';

export default Ember.Component.extend({
  actions: {
    toggleModal: function() {
      this.set('enabled', !this.get('enabled'));
    }
  },
  layout: layout
});
