'use strict';

angular.module('okcCoffee.shop', ['ngRoute', 'okcCoffee.map'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shop/:shopID', {
    templateUrl: 'shop/shop.html',
    controller: 'ShopCtrl'
  });
}])

.controller('ShopCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
  $scope.$emit('centerMap', $routeParams.shopID);
  $scope.centerMap = function(id){
    $scope.$emit('centerMap', $routeParams.shopID);
    $('body').toggleClass('active-map');
  };
  var url = 'http://coffeeapi.darrenjaworski.com/wp-json/wp/v2/cafes/' + $routeParams.shopID;
  $http.get(url).then(function(response) {
    $scope.shop = response.data;

    $scope.shop.name = $scope.shop.title.rendered;
    $scope.shop.short_description = $scope.shop.cfs.short_description;
    $scope.shop.description = $scope.shop.content.rendered;

    $scope.shop.location_street = $scope.shop.cfs.location_street;

    $scope.shop.menu = $scope.shop.cfs.menus;

    $scope.shop.espresso = ~~$scope.shop.cfs.espresso;
    $scope.shop.speciality = ~~$scope.shop.cfs.speciality;
    $scope.shop.drip = ~~$scope.shop.cfs.drip;
    $scope.shop.roaster = ~~$scope.shop.cfs.roaster;
    $scope.shop.tea = ~~$scope.shop.cfs.tea;
    $scope.shop.food = ~~$scope.shop.cfs.food;

    $scope.shop.hipster = ~~$scope.shop.cfs.hipster;
    $scope.shop.casual = ~~$scope.shop.cfs.casual;
    $scope.shop.noisey = ~~$scope.shop.cfs.noisey;
    $scope.shop.study_hall = ~~$scope.shop.cfs.study_hall;

    $scope.shop.keep_it_local = ~~$scope.shop.cfs.keep_it_local;
    $scope.shop.city_card = ~~$scope.shop.cfs.city_card;

  });
}]);
