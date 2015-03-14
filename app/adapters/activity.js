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
    // console.log(this.user);
       return ajax("https://api.parse.com/1/classes/activity" + '?where={"$relatedTo":{"object":{"__type":"Pointer","className":"_User","objectId":"0TJ9ir42PX"},"key":"joinedActivities"}}}' + "&include=activityOwner").then(function(response){
         return response.results.map(function(activity) {
           activity.id = activity.objectId;
           delete activity.objectId;
           return activity;
         });
       });
     },
  });
