import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
  finishMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
  // activityType: function(){
  //   return this.get('model.activityType');
  // }.property(),
  // activityDate: function(){
  //   var date = this.get('model.activityDate.iso');
  //     var newDate =  date.substring(0, date.length - 1);
  //     this.set('model.activityDate.iso', newDate);
  //     console.log(this.get('model.activityDate.iso'));
  //     return newDate;
  // }.property(),

  actions: {
    edit: function(){
      this.set('isEditing', false);
    },
    cancel: function() {
      this.set('isEditing', true);
    },

    save: function() {
      this.get('model').save();
    }
  },

  isEditing: true,

});
