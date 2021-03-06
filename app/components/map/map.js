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
    $('.map-controls input').prop('checked', false);
    $scope.$emit('resetMap');
  };
}]);
