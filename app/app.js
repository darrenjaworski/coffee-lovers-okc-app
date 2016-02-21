'use strict';

// Declare app level module which depends on views, and components
angular.module('okcCoffee', [
  'ngRoute',
  'ngSanitize',
  'ngCookies',
  'okcCoffee.navigation',
  'okcCoffee.shop',
  'okcCoffee.blog',
  'okcCoffee.home',
  'okcCoffee.map'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])

.factory('cafeData', ['$http', '$q', function($http, $q){

  var cafeData = {};

  cafeData.getData = function(){
    var data1 = $http.get('http://okccoffee.dev/wp-json/wp/v2/cafes?per_page=100');
    var data2 = $http.get('http://okccoffee.dev/wp-json/wp/v2/cafes?per_page=100&offset=100');
    var test;
    var result = $q.all([
      data1,
      data2
    ]).then(function(responses){
      return responses[0].data.concat( responses[1].data );
    })
    return result;
  };

  return cafeData;

}]);
