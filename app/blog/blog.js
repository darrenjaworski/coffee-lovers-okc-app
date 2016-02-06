'use strict';

angular.module('okcCoffee.blog', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blog/:blog', {
    templateUrl: 'blog/blog.html',
    controller: 'BlogCtrl'
  });
}])

.controller('BlogCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $http.get('./../assets/static-data/blog.json').then(function(response) {
    $scope.blog = response.data[$routeParams.shopID - 1];
  });
}]);
