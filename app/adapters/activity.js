import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({

  find: function(name, id){
    var activity;
    return ajax("https://api.parse.com/1/classes/activity/" + id + "?include=activityOwner").then(function(response){
      activity = response;
      activity.id = activity.objectId;
      var date = activity.activityDate.iso;
      activity.activityDate = date.substring(0, date.length - 1);
      delete activity.objectId;
      return ajax("https://api.parse.com/1/users" + '?where={"$relatedTo":{"object":{"__type":"Pointer","className":"activity","objectId":'+ '\"' + id + '\"' + '},"key":"activityFriends"}}}');
    }).then(function(response){
      activity.activityFriends = response.results;
      return activity;
    });
  },

    findAll: function(){
    // console.log(this.get('session.currentUser.id'));
    var currentUser = this.get('session.currentUser.id');
    //  return ajax("https://api.parse.com/1/classes/activity" + '?where={"$relatedTo":{"object":{"__type":"Pointer","className":"_User","objectId":'+ '\"' + currentUser + '\"' + '},"key":"joinedActivities"}}}' + "&include=activityOwner").then(function(response){
      return ajax("https://api.parse.com/1/classes/activity" + '?where={"activityFriends":{"__type":"Pointer","className":"_User","objectId":'+ '\"' + currentUser + '\"' + '}}').then(function(response){
         return response.results.map(function(activity) {
           activity.id = activity.objectId;
           delete activity.objectId;
           var date = activity.activityDate.iso;
           activity.activityDate = date.substring(0, date.length - 1);
           if (activity.activityStart < activity.activityFinish) {
             activity.distance = activity.activityFinish - activity.activityStart;
           } else {
             activity.distance = activity.activityStart - activity.activityFinish;
           }

           if (activity.activityStyle === "Round-Trip") {
             activity.distance = activity.distance * 2;
           }

           return activity;
         });
       });
     },

    save: function(name, record){
      if(record.id) {
        return ajax({
          url: "https://api.parse.com/1/classes/activity/" + record.id,
          type: "PUT",
          data: JSON.stringify(record.toJSON()),
        }).then(function(response) {
          record.updatedAt = response.updatedAt;
          return record;
        });
      } else {
        return ajax({
          url:  "https://api.parse.com/1/classes/activity",
          type: "POST",
          data: JSON.stringify(record.toJSON()),
          contentType: 'application/json'
        }).then(function(response){
          record.id = response.objectId;
          record.createdAt = response.createdAt;
          return ajax({
            url:  "https://api.parse.com/1/classes/activity/" + response.objectId,
            type: "PUT",
            data: JSON.stringify(record.serializeFriends(record.activityFriends)),
            contentType: 'application/json'
          });
        }).then(function(response) {
          record.updatedAt = response.updatedAt;
          return record;
        });
      }
  },

    destroy: function(name, record){
      return ajax({
        url: "https://api.parse.com/1/classes/activity/" + record.id,
        type: "DELETE",
      });
    },
});
