import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Object.extend({
  find: function(name, id){
      return ajax("https://api.parse.com/1/classes/activity/" + id + "?include=activityOwner").then(function(activity){
        activity.id = activity.objectId;
        delete activity.objectId;
        // console.log(activity);
        return activity;
    });
  },

    findAll: function() {
       return ajax("https://api.parse.com/1/classes/activity").then(function(response){
         return response.results.map(function(activity) {
           activity.id = activity.objectId;
           delete activity.objectId;
          //  console.log(activity);
           return activity;
         });
       });
     },
  });
