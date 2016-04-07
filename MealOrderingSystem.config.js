(function () {

  'use strict';

  angular.module('MealOrderingSystem').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'loginController',
        templateUrl: '/login.html',
      })
      .state('orders', {
        url: '/orders',
        controller: 'ordersController',
        templateUrl: '/orders.html',
      })
      // .state('chat', {
      //   url: '/chat',
      //   templateUrl: '/components/html/chat.html',
      // })
      // .state('login', {
      //   url: '/login',
      //   templateUrl: '/components/html/login.html'
      // })
      // .state('register', {
      //   url: '/register',
      //   templateUrl: '/components/html/register.html'
      // })
  });

}());