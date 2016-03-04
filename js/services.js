angular.module('Ledger.services', [])

.factory('Features', function() {

  var features = [
    {
      "id": 1,
      "title": "Персонально ваш",
      "duration": 60,
      "visibility": 1
    },
    {
      "id": 2,
      "title": "Дилетанты",
      "duration": 60,
      "visibility": 1
    },
    {
      "id": 3,
      "title": "Курс Потапенко",
      "duration": 60,
      "visibility": 1
    },
    {
      "id": 4,
      "title": "Суть событий",
      "duration": 60,
      "visibility": 1
    },
    {
      "id": 5,
      "title": "Чувствительно",
      "duration": 60,
      "visibility": 1
    },
    {
      "id": 6,
      "title": "Все так",
      "duration": 60,
      "visibility": 1
    },
    {
      "id": 7,
      "title": "Цена победы",
      "duration": 60,
      "visibility": 1
    },
    {
      "id": 8,
      "title": "Открытая библиотека",
      "duration": 60,
      "visibility": 1
    },
    {
      "id": 9,
      "title": "Телехранитель",
      "duration": 60,
      "visibility": 1
    },
    {
      "id": 10,
      "title": "Точка",
      "duration": 60,
      "visibility": 1
    }];

  return {
    all: function() {
      return features;
    },
//    hide: function(feature) {
//      features.splice(features.indexOf(feature), 1);
//    },
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
    remove: function (tag) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].time === tag) {
            records.splice (i, 1);
            $localStorage.storeObject('records', records);
        }
      }
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

//.factory('Database', function(){
//    var shortName = 'catdb' ;
//    var version = '1.0';
//    var displayName = "Cat's Ledger Database";
//    var maxSize = 5 * 1024 * 1024; // in bytes
//    var db = openDatabase(shortName, version, displayName, maxSize);
//
//    db.transaction(function(tx) {
//        tx.executeSql("CREATE TABLE IF NOT EXISTS features(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, duration INTEGER NOT NULL);");
//    });
//
//    var ftrs = [];
//
//    function dataHandler(tx, results) {
//      ftrs.length = 0;
//      var len = results.rows.length;
//      for(var i = 0; i < len; i++) {
//              ftrs.push(results.rows.item(i));
//      }
//    }
//
//    function errorHandler(tx, error) {
//      console.log('Error: ' + error.message + ' Code: ' + error.code);
//      return;
//    }
//
//    return {
//      all:  function() {
//        db.transaction (function(tx) {
//          tx.executeSql("SELECT * FROM features;", [], dataHandler, errorHandler);
//        });
//        return ftrs;
//      },
//      get: function(featureId) {
//        db.transaction (function(tx) {
//          tx.executeSql("SELECT * FROM features WHERE id=?;", [featureId], dataHandler, errorHandler);
//          console.log(ftrs);
//          console.log(featureId);
//        });
//        return ftrs;
//      }
//    };
//})

;
