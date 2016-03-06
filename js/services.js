angular.module('Ledger.services', [])

.factory('Features', function(Database) {

  var features = Database("SELECT * FROM features;");

  return {
    all: function() {
      return features;
    },
    get: function(featId) {
      for (var i = 0; i < features.length; i++) {
        if (features[i].id === featId) {
          return features[i];
        }
      }
      return null;
    },
    remove: function(featId) {
      for (var i = 0; i < features.length; i++) {
        if (features[i].id === featId) {
            features.splice (i, 1);
        }
      };
      Database("DELETE FROM features WHERE id=?;", [featId]);
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

.factory('Database', function(){
    var shortName = 'catdb' ;
    var version = '1.0';
    var displayName = "Cat's Ledger Database";
    var maxSize = 5 * 1024 * 1024; // in bytes
    var db = openDatabase(shortName, version, displayName, maxSize);

    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS features(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, duration INTEGER NOT NULL);");
    });

    var series = [];
    var params = [];

    function dataHandler(tx, results) {
      series.length = 0;
      var len = results.rows.length;
      for(var i = 0; i < len; i++) {
          series.push(results.rows.item(i));
      }
    }

    function errorHandler(tx, error) {
      console.log('Error: ' + error.message + ' Code: ' + error.code);
      return;
    }

    return function(query, params) {
      db.transaction (function(tx) {
          tx.executeSql(query, params, dataHandler, errorHandler);
      });
      return series;
    }


})
;


//  var features = [
//    {
//      "id": 1,
//      "title": "Персонально ваш",
//      "duration": 60,
//      "visibility": 1
//    },
//    {
//      "id": 2,
//      "title": "Дилетанты",
//      "duration": 60,
//      "visibility": 1
//    },
//    {
//      "id": 3,
//      "title": "Курс Потапенко",
//      "duration": 60,
//      "visibility": 1
//    },
//    {
//      "id": 4,
//      "title": "Суть событий",
//      "duration": 60,
//      "visibility": 1
//    },
//    {
//      "id": 5,
//      "title": "Чувствительно",
//      "duration": 60,
//      "visibility": 1
//    },
//    {
//      "id": 6,
//      "title": "Все так",
//      "duration": 60,
//      "visibility": 1
//    },
//    {
//      "id": 7,
//      "title": "Цена победы",
//      "duration": 60,
//      "visibility": 1
//    },
//    {
//      "id": 8,
//      "title": "Открытая библиотека",
//      "duration": 60,
//      "visibility": 1
//    },
//    {
//      "id": 9,
//      "title": "Телехранитель",
//      "duration": 60,
//      "visibility": 1
//    },
//    {
//      "id": 10,
//      "title": "Точка",
//      "duration": 60,
//      "visibility": 1
//    }];
