import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path: '/'});

  this.route('login', {path: '/login'});

  this.route('register', {path: '/register'});

  this.route('account', {path: '/account'});

  this.route('activity', {path: '/activity/:activity_id'});

  this.route('create', {path: '/create'});
});

export default Router;
