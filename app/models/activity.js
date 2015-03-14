import Ember from 'ember';

export default Ember.Object.extend({
  destroy: function(){
    this.store.destroy('activity', this);
  },

  save: function(){
    this.store.save('activity', this);
  },

  toJSON: function(){
    return this;
  }
});
