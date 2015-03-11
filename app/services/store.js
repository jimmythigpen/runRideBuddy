import Ember from 'ember';

export default Ember.Object.extend({
  find: function(name, id){
   var adapter = this.container.lookup('adapter:' + name);
   return adapter.find(name, id);
  },

  findAll: function(name){
   var adapter = this.container.lookup('adapter:' + name);
   return adapter.findAll(name);
   },
});
