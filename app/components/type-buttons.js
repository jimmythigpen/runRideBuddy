import Ember from 'ember';
import layout from '../templates/components/type-buttons';


export default Ember.Component.extend({
  layout: layout,
  tagName : "input",
     type : "radio",
     attributeBindings : [ "name", "type", "value", "checked:checked:", "disabled"],
     click : function() {
         this.set("selection", this.$().val());
     },
     checked : function() {
         return this.get("value") === this.get("selection");
     }.property()
});
