'use strict';

angular.module('okcCoffee.navigation', ['ngRoute'])

.controller('NavigationCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.map = function() {
    $('body').toggleClass('active-map')
  }
}]);
