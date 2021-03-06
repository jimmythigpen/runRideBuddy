import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.baseURL
});

Router.map(function() {
  this.route('home', {path: '/'}, function() {
    this.route('account');
    this.route('activity', {path: '/activity/:activity_id'});
    this.route('create');
    this.route('completed');
  });

  this.route('login');
  this.route('register');
});

export default Router;
