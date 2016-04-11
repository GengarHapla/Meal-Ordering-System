(function () {

  'use strict';

  angular.module('MealOrderingSystem').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'loginController',
        templateUrl: 'app/login/login.html',
      })
      .state('orders', {
        url: '/orders',
        controller: 'ordersController',
        templateUrl: 'app/orders/orders.html',
      });
  });

}());
