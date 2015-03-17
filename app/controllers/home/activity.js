import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
  finishMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],

  actions: {
    edit: function(){
      this.set('isEditing', false);
    },
    cancel: function() {
      this.set('isEditing', true);
    },

    save: function() {
      this.get('model.activity').save();
    }
  },

  isEditing: true,

});
