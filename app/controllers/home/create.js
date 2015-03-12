import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 24, 25, 26, 27],
  finishMarker: [23, 24, 25, 26, 27],
  activityType: 'Run/Walk',
  activityStyle: 'One-Way',

  actions: {
    saveNew: function(){
      var newData = this.getProperties('activityName', 'activityDate', 'activityType', 'activityStyle', 'activityStart', 'activityFinish', 'activityNotes');
      console.log(newData);
    }
  }
});
