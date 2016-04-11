(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('loginController', function ($scope, $state) {
  	 $scope.performLogin = function () {
       //OAuth is problematic to work with localhost, too time consuming for now, TODO
  	 	$state.go('orders');
    };
  });

}());
