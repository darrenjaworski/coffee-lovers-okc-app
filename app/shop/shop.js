'use strict';

angular.module('okcCoffee.shop', ['ngRoute', 'okcCoffee.map'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shop/:shopID', {
    templateUrl: 'shop/shop.html',
    controller: 'ShopCtrl'
  });
}])

.controller('ShopCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.$emit('centerMap', $routeParams.shopID - 1);
  $http.get('./../assets/static-data/yelp.json').then(function(response) {
    $scope.shop = response.data[$routeParams.shopID - 1];
  });
}]);
