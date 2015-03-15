import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Controller.extend({
  startMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
  finishMarker: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 36.5],
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
        objectId: this.get('session.currentUser.id')
      };
      ajax({
        url:  "https://api.parse.com/1/classes/activity",
        type: "POST",
        data: JSON.stringify(createData),
        contentType: 'application/json'
      // }).then(function(response){
      //   var currentUser = this.get('session.currentUser.id');
      //   var activity = {};
      //   activity.joinedActivities = {
      //     __op: "AddRelation",
      //     objects: [{__type:"Pointer",className:"activity",objectId: response.objectId}],
      //   };
      //   ajax({
      //     url:  "https://api.parse.com/1/users/" + currentUser,
      //     type: "PUT",
      //     data: JSON.stringify(activity),
      //     contentType: 'application/json'
    }).then(function(response){
          var activity = {};
          activity.activityFriends = {
            __op: "AddRelation",
            objects: [{__type:"Pointer",className:"_User",objectId: "ZgsnF0hE4t"},
                      {__type:"Pointer",className:"_User",objectId: "zbywJVtVHS"}

                    ],
          };
          ajax({
            url:  "https://api.parse.com/1/classes/activity/" + response.objectId,
            type: "PUT",
            data: JSON.stringify(activity),
            contentType: 'application/json'
          // });
        });
      }.bind(this));
    }
  }
});
