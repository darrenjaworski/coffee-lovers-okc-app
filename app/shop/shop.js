'use strict';

angular.module('okcCoffee.shop', ['ngRoute', 'ngCookies', 'okcCoffee.map'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/shop/:shopID', {
    templateUrl: 'shop/shop.html',
    controller: 'ShopCtrl'
  });
}])

.controller('ShopCtrl', ['$scope', '$routeParams', '$http', '$cookies', function($scope, $routeParams, $http, $cookies) {
  $scope.centerMap = function(id){
    $scope.$emit('centerMap', $routeParams.shopID);
    $('body').toggleClass('active-map');
  };
  var url = 'http://coffeeapi.darrenjaworski.com/wp-json/wp/v2/cafes/' + $routeParams.shopID;

  var favorites = $cookies.get('favorites');
  var favObject = {};
  var farDate = '01/01/2020';
  var cookieOptions = {expires: farDate};

  if (!favorites || favorites == undefined) {
    favObject = {
      name: "favorites",
      favoritesList: []
    };
    $cookies.putObject('favorites', favObject, cookieOptions);
  } else {
    favObject = JSON.parse( favorites);
  }

  $http.get(url).then(function(response) {

    $scope.shop = response.data;
    var mediaURL = 'http://coffeeapi.darrenjaworski.com/wp-json/wp/v2/media/' + $scope.shop.cfs.hero_image;
    $http.get(mediaURL).then(function(response){
      console.log(response)
      //medium
      //$scope.shop.hero_image = response.data.media_details.sizes.medium.source_url;
      $scope.shop.hero_image = response.data.source_url;
    });
    $scope.shop.permalink = window.location.href;

    if ( favObject.favoritesList.indexOf($scope.shop.id) > -1 ) {
      $scope.shop.favorite = 0;
    } else {
      $scope.shop.favorite = 1;
    }

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

  $scope.favorite = function(id) {
    var favObject = JSON.parse( $cookies.get('favorites') );

    if ( favObject.favoritesList.indexOf(id) > -1 ) {
      var index = favObject.favoritesList.indexOf(id);
      this.$parent.shop.favorite = 0;
      favObject.favoritesList.splice( index , index + 1 );
    } else {
      this.$parent.shop.favorite = 1;
      favObject.favoritesList.push(id);
    }

    $cookies.putObject('favorites', favObject, {expires: '01/01/2020'});
    return;
  };

  $scope.$emit('centerMap', $routeParams.shopID);
}]);
