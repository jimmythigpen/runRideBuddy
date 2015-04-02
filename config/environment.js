/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'run-ride-buddy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    'simple-auth': {
      authorizer: 'authorizer:parse',
      crossOriginWhitelist: ['https://api.parse.com'],
      routeAfterAuthentication: 'home',
      routeIfAlreadyAuthenticated: 'home'
    },

    parseKeys: {
      applicationId: "WTSinPP7KDLUcIP00LXJ3NqAb3NPOAs0eBAs65mi",
      restApi: "bwC5mdCVn0ExQHpeyrfXjBGLttgKCWK8Hv7eqVzL"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'report-uri': "'http://localhost:4200'",
      'default-src': "'none'",
      'script-src': "'self'",
      'font-src': "'self' *",
      'connect-src': "'self' *",
      'img-src': "'self' *",
      'style-src': "'self' *",
      'media-src': "'self'",
      'frame-src': "'self' *"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.baseURL = '/runRideBuddy';
    ENV.locationType = 'none';
  }

  return ENV;
};
