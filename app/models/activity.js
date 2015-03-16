import Ember from 'ember';

export default Ember.Object.extend({
  destroy: function(){
    return this.store.destroy('activity', this);
  },

  save: function(){
    return this.store.save('activity', this);
  },

  toJSON: function(){

    var data = Ember.Object.create(this);

    var ownerId = this.get('activityOwner.id');
    if(ownerId) {
      data.set('activityOwner', {
        __type: 'Pointer',
        className: '_User',
        objectId: ownerId
      });
    }

    data.set('activityDate', {
      __type: "Date",
      iso: (new Date(this.get('activityDate'))).toISOString()
    });

    return data;
  }
});
