'use strict';

angular.module('okcCoffee.map', [
  'okcCoffee.map.map-directive'
])

.controller('MapCtrl', ['$scope', function($scope){
  $scope.mapfilter = null;
  $scope.$watch('mapfilter', function(newVal, oldVal){
    $scope.$emit('filterMap', newVal);
  });
  $scope.zoomAll = function(){
    $scope.$emit('zoomMap');
  };
  $scope.showAll = function(){
    // var inputs = $('.map-controls input');
    // console.log(inputs);
    $scope.$emit('resetMap');
  };
}])

.factory('mapData', ['$http', function($http){

  var mapData = {};

  mapData.getData = function(){
    return $http.get('./../assets/static-data/yelp.json');
  };

  return mapData;

}]);
