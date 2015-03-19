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
    // console.log(friends);
    // console.log(friends.map(this.serializeFriend));
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
    console.log(friend);
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
    // console.log(this.getProperties('activityDate'));
    // console.log(this.getProperties('activityOwner.id'));
    var data = this.getProperties('activityName', 'activityType', 'activityStyle', 'activityStart', 'activityFinish', 'activityNotes');
    // var data = Ember.Object.create(this);
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
