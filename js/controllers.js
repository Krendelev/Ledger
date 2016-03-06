'use strict';

angular.module('Ledger.controllers', [])

.controller('FeaturesCtrl', function($scope, $stateParams, Features) {

  $scope.features = Features.all();
  $scope.delete = function(featId) {
    Features.remove(featId);
  };
})

.controller('RecordCtrl', function($scope, $stateParams, $ionicHistory, Features, Records) {

  $scope.feature = Features.get($stateParams.featureId);
  $scope.record = {rec: 0};
  $scope.part = [
    {name: '1/4', quant: 0.25},
    {name: '1/3', quant: 0.33},
    {name: '1/2', quant: 0.50},
    {name: '2/3', quant: 0.66},
    {name: '3/4', quant: 0.75},
    {name: '1/1', quant: 1}
  ];
  $scope.date = {value: new Date()};

  $scope.store = function () {
    var minutes = Math.round ($scope.feature.duration * $scope.record.rec.quant);
    Records.store (Date.parse($scope.date.value), $scope.feature.title, $scope.record.rec.name, minutes);
    $ionicHistory.clearCache();
  };

})

.controller('LogCtrl', function($scope, $ionicHistory, Features, Records) {

  $scope.$on('$ionicView.enter', function() {
    $ionicHistory.clearHistory();
  });
  $scope.records = Records.all();
  $scope.remove = function(tag) {
    Records.remove(tag);
  };

})

.controller('SummaryCtrl', function($scope, Records) {

  $scope.records = Records.all();
  $scope.period = {};

  $scope.getTotal = function() {
    var thisYear = (new Date()).getFullYear();
    var sum = 0;
    var counter = 0;
    var timeStamp = {};
    for ( var i = 0; i < $scope.records.length; i++ ) {
      timeStamp = new Date ($scope.records[i].time);
      if (timeStamp.getFullYear() === thisYear && timeStamp.getMonth().toString() === $scope.period.value) {
        sum += $scope.records[i].minutes;
        counter++;
      }
    };
    $scope.total = (sum / 60).toFixed(2);
    $scope.count = counter;
  }

})

;
