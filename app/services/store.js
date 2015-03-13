import Ember from 'ember';
import IdentityMap from '../models/identity-map';

var identityMap = IdentityMap.create();

export default Ember.Object.extend({
  find: function(type, id){

    var cached = identityMap.get(type, id);
    if(cached) { return Ember.RSVP.resolve(cached); }

    var adapter = this.container.lookup('adapter:' + type);
    return adapter.find(type, id).then(function(record) {
      identityMap.set(type, id, record);
      return record;
    });
  },

  findAll: function(type){
    var adapter = this.container.lookup('adapter:' + type);
    return adapter.findAll(type).then(function(records) {
      identityMap.clear(type);
      records.forEach(function(r) {
        identityMap.set(type, r.id, r);
      });

      return identityMap.get(type);
    });
  },

  findQuery: function(type, query){
    var adapter = this.container.lookup('adapter:' + type);
    return adapter.findQuery(type, query);
  },

  destroy: function(type, record) {
    var adapter = this.container.lookup('adapter:' + type);
    return adapter.destroy(type, record).then(function() {
      identityMap.remove(type, record);
    });
  },

  save: function(type, record) {
    var adapter = this.container.lookup('adapter:' + type);
    return adapter.save(type, record).then(function() {
      identityMap.set(type, record.id, record);
      return record;
    });
  },

  push: function(type, record) {
    return identityMap.set(type, record.id, record);
  }
});
