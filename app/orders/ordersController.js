(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('ordersController', function ($rootScope, $scope, $mdDialog, $mdToast, ordersService) {

    $rootScope.$on('logged', function () {
      $mdToast.show($mdToast.simple().textContent('Welcome '+$rootScope.user.name).position('top').hideDelay(10000).capsule(true));
    })

  	var tabs = [
	      { title: 'Active orders'}, { title: 'History of orders'}
	    ];
    var parentEl = angular.element(document.body);

    $scope.myDataRef = ordersService.startConnection();

    //Source: https://coderwall.com/p/ngisma/safe-apply-in-angular-js
    $scope.safeApply = function (fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    //exposed to $scope for unit testing
    $scope.listUpdate = function (update) {
      if (update.status === 'new') {
        $scope.orders.push(update);
      } else if (/finalized|ordered|delivered/i.test(update.status)) {
        $scope.archivedOrders.push(update);
      }
    }

    //exposed to $scope for unit testing
    $scope.myDataRef.on('value', function (resp) {
      var orders = resp.val();
      $scope.orders = [];
      $scope.archivedOrders = [];
      for (var key in orders) {
        if (orders.hasOwnProperty(key)) {
          orders[key].id = key;
          $scope.listUpdate(orders[key]);
        }
      }
      $scope.safeApply();
    });
    //TODO: Use caching

    $scope.tabs = tabs;
    $scope.selectedIndex = 0;

    $scope.createOrder = function ($event) {
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        locals: {event: 'create', base: $scope.myDataRef},
        preserveScope: true,
        templateUrl: 'app/orders/ordersDialog.html',
        controller: 'ordersDialogController',
        controllerAs: 'vm'
     });
   };

    $scope.orderDetails = function ($event, index, archived) {
       var details;
       if (archived) {
        details = $scope.archivedOrders[index];
       } else {
        details = $scope.orders[index];
       }
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         locals: {event: 'edit', details: details},
         preserveScope: true,
         templateUrl: 'app/orders/ordersDialog.html',
         controller: 'ordersDialogController',
         controllerAs: 'vm'
      });
    };

  });

}());
