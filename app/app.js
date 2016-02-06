'use strict';

// Declare app level module which depends on views, and components
angular.module('okcCoffee', [
  'ngRoute',
  'ngSanitize',
  'okcCoffee.navigation',
  'okcCoffee.shop',
  'okcCoffee.blog',
  'okcCoffee.home',
  'okcCoffee.map'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
