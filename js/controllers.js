"use strict";

angular.module('Ledger.controllers', [])

.controller('FeaturesCtrl', function($scope, $ionicModal, Features) {

  $scope.features = Features.all();
  $scope.feature = {
                    id: 0,
                    title: "",
                    duration: undefined
  };
  if (Object.keys($scope.features).length > 0) {
      $scope.feature.id = $scope.features[$scope.features.length-1].id;
  }

  $scope.add = function() {
    Features.add(++$scope.feature.id, $scope.feature.title, $scope.feature.duration);
    $scope.feature.title = "";
    $scope.feature.duration = undefined;

    $scope.modal.hide();
  };
  $scope.remove = function(feature) {
    Features.remove(feature);
  };

  $ionicModal.fromTemplateUrl('templates/addFeature.html', {scope: $scope})
    .then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showAdd = function() {
    $scope.modal.show();
  };

  $scope.closeAdd = function() {
    $scope.feature.title = "";
    $scope.feature.duration = 0;
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('RecordCtrl', ['$scope', '$stateParams', '$ionicHistory', 'Features', 'Records', function($scope, $stateParams, $ionicHistory, Features, Records) {

  $scope.feature = Features.get($stateParams.featureId);
  $scope.record = {rec: 0};
  $scope.part = [
    {name: '1/4', quant: 0.25},
    {name: '1/3', quant: 0.33},
    {name: '1/2', quant: 0.50},
    {name: '2/3', quant: 0.66},
    {name: '3/4', quant: 0.75},
    {name: '1/1', quant: 1.00}
  ];
  $scope.date = {value: new Date()};
  $scope.mila = {did: 1};

  $scope.store = function () {
    var minutes = Math.round ($scope.feature.duration * $scope.record.rec.quant * $scope.mila.did);
    Records.store (Date.parse($scope.date.value), $scope.feature.title, $scope.record.rec.name, minutes);
    $ionicHistory.clearCache();

  };

}])

.controller('LogCtrl', function($scope, $ionicHistory, Features, Records) {

  $scope.$on('$ionicView.enter', function() {
    $ionicHistory.clearHistory();
  });
  $scope.records = Records.all();
  $scope.remove = function(record) {
    Records.remove(record);
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
    }
    $scope.total = (sum / 60).toFixed(2);
    $scope.count = counter;
  };

})

;
