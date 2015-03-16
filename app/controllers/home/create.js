import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
  finishMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
  activityType: 'Run',
  activityStyle: 'One-Way',

  actions: {
    saveNew: function(){
      // var createData = this.get('model').toJSON();
      // return ajax({
      //   url:  "https://api.parse.com/1/classes/activity",
      //   type: "POST",
      //   data: JSON.stringify(createData),
      //   contentType: 'application/json'
      //
      // }).then(function(response){
      //   var activity = this.get('model').serializeFriends();
      //   return ajax({
      //     url:  "https://api.parse.com/1/classes/activity/" + response.objectId,
      //     type: "PUT",
      //     data: JSON.stringify(activity),
      //     contentType: 'application/json'
      //   });
      // }.bind(this));
      this.get('model').save();
    }
  }
});
