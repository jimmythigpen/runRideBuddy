import Ember from 'ember';

export default Ember.Object.extend({
  destroy: function(){
    return this.store.destroy('activity', this);
  },

  save: function(){
    return this.store.save('activity', this);
  },

  addFriend: function(friend) {
    console.log(friend);
  // ajax with addRelation with serializeFriend(friend)
  },

  // removeFriend: function(friend) {
  // ajax with removeRelation with serializeFriend(friend)
  // },

  serializeFriend: function(friend) {
    return {__type: "Pointer", className: "_User", objectId: friend.id};
  },

  serializeFriends: function(){
    return {
      activityFriends: {
        __op: "AddRelation",
        objects: [
          {__type:"Pointer",className:"_User",objectId: "ZgsnF0hE4t"},
          {__type:"Pointer",className:"_User",objectId: "zbywJVtVHS"}
        ]
        // objects: this.get('activityFriends').map(this.serializeFriend)
      }
    };
  },

  toJSON: function(){
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
