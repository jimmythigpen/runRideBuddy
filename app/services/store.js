import Ember from 'ember';
import IdentityMap from '../models/identity-map';

var identityMap = IdentityMap.create();

export default Ember.Object.extend({
  find: function(type, id){

    var cached = identityMap.get(type, id);
    if(cached) { return Ember.RSVP.resolve(cached); }

    var adapter = this.container.lookup('adapter:' + type);
    return adapter.find(type, id).then(function(recordData) {
      var record = this.createRecord(type, recordData);
      identityMap.set(type, id, record);
      return record;
    }.bind(this));
  },

  findAll: function(type){
    var adapter = this.container.lookup('adapter:' + type);
    return adapter.findAll(type).then(function(recordsData) {
      identityMap.clear(type);
      recordsData.forEach(function(recordData) {
        var record = this.createRecord(type, recordData);
        identityMap.set(type, record.id, record);
      }.bind(this));

      return identityMap.get(type);
    }.bind(this));
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
    var serialized = record.toJSON();

    return adapter.save(type, serialized).then(function(recordData) {
      var record = this.createRecord(type, recordData);
      identityMap.set(type, record.id, record);
      return identityMap.get(type, record.id);
    }.bind(this));
  },

  push: function(type, record) {
    return identityMap.set(type, record.id, record);
  },

  createRecord: function(type, properties){
    var klass = this.modelFor(type);
    return klass.create(properties);
  },

  modelFor: function(type) {
    return this.container.lookupFactory('model:' + type);
  }
});
