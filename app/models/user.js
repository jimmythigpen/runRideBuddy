// import Ember from 'ember';
import Model from 'ember-magic-man/model';

export default Model.extend({
  fullName: function(){
    return "<img class='search-image' src='" + this.get('profilePic.url') + "'/>" + " " + this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});



// return this.get('firstName') + " " + this.get('lastName') + " " + "<img class='search-image' src='" + this.get('profilePic.url') + "'/>";
