(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('loginController', function ($scope, $state) {
  	 $scope.performLogin = function () {
  	 	$state.go('orders'); 
  	 }
  });

}());