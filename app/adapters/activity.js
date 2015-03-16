import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  find: function(name, id){
      return ajax("https://api.parse.com/1/classes/activity/" + id + "?include=activityOwner").then(function(activity){
        activity.id = activity.objectId;
        delete activity.objectId;
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

//I want to return the users that are in the activity’s activityFriends
//'where={"post":{"__type":"Pointer","className":"Post","objectId":"8TOXdXf3tz"}}'

    save: function(name, record){
      console.log(name, record);
      // var owner = {
      //   __type:"Pointer",
      //   className:"_User",
      //   objectId: this.get('session.currentUser.id')
      // };
      // this.set('record.activityOwner', owner);
      if(record.id) {
        return ajax({
          url: "https://api.parse.com/1/classes/activity/" + record.id,
          type: "PUT",
          data: JSON.stringify(record)
        }).then(function(response) {
          response.id = response.objectId;
          delete response.objectId;
          return response;
        });
      } else {
        return ajax({
          url: "https://api.parse.com/1/classes/activity",
          type: "POST",
          data: JSON.stringify(record)
        }).then(function(response) {
          record.updatedAt = response.updatedAt;
          return record;
        });
      }
  }
});
