import Ember from 'ember';
import layout from '../templates/components/select-file';

export default Ember.Component.extend({
  layout: layout,
  setupChange: function(){
    this.$('input[type=file]').on('change', function(event){
      this.set('file', event.target.files[0]);
      console.log(this.get('file'));
    }.bind(this));
  }.on('didInsertElement')
});
