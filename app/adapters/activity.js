import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  find: function(name, id){
    var activity;
    return ajax("https://api.parse.com/1/classes/activity/" + id + "?include=activityOwner").then(function(response){
      activity = response;
      activity.id = activity.objectId;
      activity.activityDate = activity.activityDate.iso;
      delete activity.objectId;
      return activity;
    }).then(function(){
      return ajax("https://api.parse.com/1/users" + '?where={"$relatedTo":{"object":{"__type":"Pointer","className":"activity","objectId":'+ '\"' + id + '\"' + '},"key":"activityFriends"}}}');
    }).then(function(response){
      activity.activityFriends = response.results;
      return activity;
    });
  },

    findAll: function(){
    var currentUser = this.session.content.objectId;
      //  return ajax("https://api.parse.com/1/classes/activity" + '?where={"$relatedTo":{"object":{"__type":"Pointer","className":"_User","objectId":'+ '\"' + currentUser + '\"' + '},"key":"joinedActivities"}}}' + "&include=activityOwner").then(function(response){
      return ajax("https://api.parse.com/1/classes/activity" + '?where={"activityFriends":{"__type":"Pointer","className":"_User","objectId":'+ '\"' + currentUser + '\"' + '}}').then(function(response){
         return response.results.map(function(activity) {
           activity.id = activity.objectId;
           delete activity.objectId;
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
            data: JSON.stringify(record.serializeFriends()),
            contentType: 'application/json'
          });
        }).then(function(response) {
          record.updatedAt = response.updatedAt;
          return record;
        });
      }
  }
});
