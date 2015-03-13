import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 24, 25, 26, 27],
  finishMarker: [23, 24, 25, 26, 27],
  activityType: 'Run',
  activityStyle: 'One-Way',

  actions: {
    saveNew: function(){
      var createData = this.getProperties('activityName', 'activityDate', 'activityType', 'activityStyle', 'activityStart', 'activityFinish', 'activityNotes');
      var date = new Date(createData.activityDate);
      createData.activityDate = {
        __type: "Date",
        iso: date.toISOString(),
      };
      createData.activityOwner = {
        __type:"Pointer",
        className:"_User",
        objectId:"8qwbgX3SRG"
      };
      ajax({
        url:  "https://api.parse.com/1/classes/activity",
        type: "POST",
        data: JSON.stringify(createData),
        contentType: 'application/json'
      });
    }
  }
});
