import Ember from 'ember';

export function initialize() {
  Ember.$.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "WTSinPP7KDLUcIP00LXJ3NqAb3NPOAs0eBAs65mi",
      "X-Parse-REST-API-Key": "bwC5mdCVn0ExQHpeyrfXjBGLttgKCWK8Hv7eqVzL"
    }
  });
}

export default {
  name: 'parse-tokens',
  initialize: initialize
};
