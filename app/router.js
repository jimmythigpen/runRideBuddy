import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path: '/'});

  this.route('login');

  this.route('register');

  this.route('account');

  this.route('activity', {path: '/activity/:activity_id'});

  this.route('create');
});

export default Router;
