// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Ledger', ['ionic', 'Ledger.controllers', 'Ledger.services'])

.run(function($ionicPlatform, $ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.log', {
    url: '/log',
    views: {
      'tab-log': {
        templateUrl: 'templates/tab-log.html',
        controller: 'LogCtrl'
      }
    }
  })

  .state('tab.features', {
      url: '/features',
      views: {
        'tab-features': {
          templateUrl: 'templates/tab-features.html',
          controller: 'FeaturesCtrl'
        }
      }
    })

  .state('tab.record', {
      url: '/features/:featureId',
      views: {
        'tab-features': {
          templateUrl: 'templates/record.html',
          controller: 'RecordCtrl'
        }
      }
    })

  .state('tab.summary', {
    url: '/summary',
    views: {
      'tab-summary': {
        templateUrl: 'templates/tab-summary.html',
        controller: 'SummaryCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/features');

});
