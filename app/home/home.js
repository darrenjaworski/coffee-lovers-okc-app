'use strict';

angular.module('okcCoffee.home', ['ngRoute', 'ngSanitize', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {

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

  $scope.$emit('resetMap');
  $scope.$emit('zoomMap');
  $scope.sortProp = 'name';
  $scope.sortReverse = false;
  $scope.filterProp = '';
  $http.get('http://coffeeapi.darrenjaworski.com/wp-json/wp/v2/cafes').then(function(response) {
    $scope.shops = response.data;
    $scope.shops.forEach(function(d){

      if ( favObject.favoritesList.indexOf(d.id) > -1 ) {
        d.favorite = 1;
      }

      d.short_description = d.cfs.short_description;
      d.location_street = d.cfs.location_street;
      d.name = d.title.rendered;

      d.espresso = ~~d.cfs.espresso;
      d.speciality = ~~d.cfs.speciality;
      d.drip = ~~d.cfs.drip;
      d.roaster = ~~d.cfs.roaster;
      d.tea = ~~d.cfs.tea;
      d.food = ~~d.cfs.food;

      d.qualities = [];
      if (d.cfs.espresso) {
        d.qualities.push('espresso')
      }
      if (d.speciality) {
        d.qualities.push('speciality')
      }
      if (d.drip) {
        d.qualities.push('drip')
      }
      if (d.roaster) {
        d.qualities.push('roaster')
      }
      if (d.tea) {
        d.qualities.push('tea')
      }
      if (d.food) {
        d.qualities.push('food')
      }
    })
  });

  $http.get('http://coffeeapi.darrenjaworski.com/wp-json/wp/v2/posts').then(function(response) {
    $scope.blogs = response.data;
    $scope.blogs.forEach(function(d){
      d.author = d.cfs.author;
      d.twitter = d.cfs.twitter_handle;
    })
  });

}])

.directive('shopLi', function(){
  function link($scope, el, attrs){

    if ($scope.$parent.$last){
      $('.collapsible').collapsible();
    }

  }

  function controller($scope, $cookies) {

    $scope.centerMap = function(id){
      $scope.$emit('centerMap', id);
      $('body').toggleClass('active-map');
    };

    $scope.favorite = function(id) {

      var cookieOptions = {expires: '01/01/2020'};
      var favObject = JSON.parse( $cookies.get('favorites') );

      if ( favObject.favoritesList.indexOf(id) > -1 ) {
        var index = favObject.favoritesList.indexOf(id);
        this.$parent.shop.favorite = 0;
        favObject.favoritesList.splice( index , index + 1 );
      } else {
        this.$parent.shop.favorite = 1;
        favObject.favoritesList.push(id);
      }

      $cookies.putObject('favorites', favObject, cookieOptions);
      return;
    };
  }

  return {
    link: link,
    scope: {
      shop: '=shop'
    },
    templateUrl: 'home/shop-li.html',
    controller: controller
  }
})

.directive('blogLi', function(){
  return {
    scope: {
      blog: '=blog'
    },
    templateUrl: 'home/blog-li.html'
  }
});
