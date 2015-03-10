import Ember from 'ember';
import layout from '../templates/components/nav-bar';

export default Ember.Component.extend({
  layout: layout,
  setupInteraction: function(){
    var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
    $('#js-centered-navigation-menu').removeClass("show");

    menuToggle.on('click', function(e) {
      e.preventDefault();
      $('#js-centered-navigation-menu').slideToggle(function(){
        if($('#js-centered-navigation-menu').is(':hidden')) {
          $('#js-centered-navigation-menu').removeAttr('style');
        }
      });
    });

 }.on('didInsertElement')
});
