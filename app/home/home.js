'use strict';

angular.module('okcCoffee.home', ['ngRoute', 'ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

  $scope.$emit('resetMap');
  $scope.$emit('zoomMap');
  $http.get('./../assets/static-data/yelp.json').then(function(response) {
    $scope.shops = response.data;
  });
  $http.get('./../assets/static-data/blog.json').then(function(response) {
    $scope.blogs = response.data;
  });

}])

.directive('shopLi', function(){
  function link($scope, el, attrs){

    if ($scope.$parent.$last){
      $('.collapsible').collapsible();
      $('.tooltipped').tooltip({delay: 50});
    }

  }

  function controller($scope) {

    $scope.centerMap = function(id){
      $scope.$emit('centerMap', id - 1);
      $('body').toggleClass('active-map');
    }

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
