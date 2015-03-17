import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
  finishMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
  // activityType: 'Run',
  // activityStyle: 'One-Way',

  actions: {
    saveNew: function(){
      console.log(this.get('model'));
      this.get('model').save();
    }
  }
});
