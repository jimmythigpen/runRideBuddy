// import Ember from 'ember';
import Model from 'ember-magic-man/model';

export default Model.extend({
  fullName: function(){
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});
