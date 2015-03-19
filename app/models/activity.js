import ajax from 'ic-ajax';
import Ember from 'ember';
import Model from 'ember-magic-man/model';

export default Model.extend({

  serializeFriend: function(friend) {
    if (friend.id) {
    friend.id = friend.id;
  } else {
    friend.id = friend.objectId;
  }
    return {__type: "Pointer", className: "_User", objectId: friend.id};
  },

  serializeFriends: function(friends){
    return {
      activityFriends: {
        __op: "AddRelation",
        objects: friends.map(this.serializeFriend)

      }
    };
  },

  addFriend: function(friend) {
    this.get('activityFriends').pushObject(friend);
    return ajax("https://api.parse.com/1/classes/activity/" + this.get('id'), {
      type: "PUT",
      data: JSON.stringify({
        activityFriends: {
          __op: "AddRelation",
          objects: [this.serializeFriend(friend)]
        }
      })
    });
  },

  removeFriend: function(friend) {
    this.get('activityFriends').removeObject(friend);
    return ajax("https://api.parse.com/1/classes/activity/" + this.get('id'), {
      type: "PUT",
      data: JSON.stringify({
        activityFriends: {
          __op: "RemoveRelation",
          objects: [this.serializeFriend(friend)]
        }
      })
    });
  },

  toJSON: function(){
    var data = this.getProperties('activityName', 'activityType', 'activityStyle', 'activityStart', 'activityFinish', 'activityNotes');
    var ownerId = this.get('activityOwner.id');
    if(ownerId) {
    Ember.set(data, 'activityOwner', {
        __type: 'Pointer',
        className: '_User',
        objectId: ownerId
      });
    }
    Ember.set(data, 'activityDate', {
      __type: "Date",
      iso: (new Date(this.get('activityDate'))).toISOString()
    });
    return data;
  }
});
