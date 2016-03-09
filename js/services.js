angular.module('Ledger.services', [])

.factory('Features', function($localStorage) {

  var features = $localStorage.getObject('features', '[]');

  return {
    all: function() {
      return features;
    },
    add: function(id, title, duration) {
      features.push({id: id, title: title, duration: duration});
      $localStorage.storeObject('features', features);
    },
    remove: function(feature) {
      features.splice(features.indexOf(feature), 1);
      $localStorage.storeObject('features', features);
    },
    get: function(featureId) {
      for (var i = 0; i < features.length; i++) {
        if (features[i].id === parseInt(featureId)) {
          return features[i];
        }
      }
      return null;
    }
  };
})

.factory('Records', function($localStorage) {

  var records = $localStorage.getObject('records', '[]');

  return {
    all: function() {
    return records;
    },
    store: function (time, title, part, minutes) {
      records.push({time: time, title: title, part: part, minutes: minutes});
      $localStorage.storeObject('records', records);
    },
    remove: function (record) {
      records.splice(records.indexOf(record), 1);
      $localStorage.storeObject('records', records);
    }
  };

})

.factory('$localStorage', ['$window', function($window) {
    return {
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    };
}])
;
