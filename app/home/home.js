'use strict';

angular.module('okcCoffee.home', ['ngRoute', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.$emit('resetMap');
  $scope.$emit('zoomMap');
  $scope.sortProp = 'name';
  $scope.sortReverse = false;
  $scope.filterProp = '';
  $http.get('./../assets/static-data/yelp.json').then(function(response) {
    $scope.shops = response.data;
    $scope.shops.forEach(function(d){
      d.qualities = [];
      if (d.expresso) {
        d.qualities.push('expresso')
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
    console.log( $scope.shops );
  });
  $http.get('./../assets/static-data/blog.json').then(function(response) {
    $scope.blogs = response.data;
  });

}])

.directive('shopLi', function($cookies){
  function link($scope, el, attrs){

    if ($scope.$parent.$last){
      $('.collapsible').collapsible();
      $('.tooltipped').tooltip({delay: 50});
    }

  }

  function controller($scope, $cookies) {

    $scope.centerMap = function(id){
      $scope.$emit('centerMap', id - 1);
      $('body').toggleClass('active-map');
    };

    $scope.favorite = function(id) {
      var favoritesArray = $cookies.get('favorites');
      console.log(favoritesArray)
      if ( favoritesArray.indexOf(id) !== -1 ) {
        console.log('need to remove from array');
        favoritesArray.splice( favoritesArray.indexOf(id) )
        console.log(favoritesArray);
      } else {
        console.log('need to add to array')
        console.log(favoritesArray)
        favoritesArray.push(id)
      }
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
