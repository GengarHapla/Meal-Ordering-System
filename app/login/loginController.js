(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('loginController', function ($rootScope, $scope, $state) {

  	$scope.performLogin = function () {
  	  $state.go('orders');
    };

    hello.init({
	  facebook: '704532819689808'}, 
	  {redirect_uri: '/#/orders'}
	);

    hello.on('auth.login', function(auth) {
	  hello(auth.network).api('/me').then(function(response) {
		$rootScope.user = response;
		$rootScope.$emit('logged')
		$scope.performLogin()
	  });
	});

  });

}());
