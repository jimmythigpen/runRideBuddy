import ajax from 'ic-ajax';
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    var currentUser = this.get('session.currentUser.id');
      return ajax("https://api.parse.com/1/classes/activity" + '?where={"$relatedTo":{"object":{"__type":"Pointer","className":"_User","objectId":'+ '\"' + currentUser + '\"' + '},"key":"completedActivities"}}}' + "&include=activityOwner").then(function(response){
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
});
