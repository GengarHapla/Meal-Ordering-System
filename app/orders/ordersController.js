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

    var myDataRef = ordersService.startConnection();

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };

    function listUpdate (snapshot) {
      if (snapshot.status === 'new') {
        $scope.orders.push(snapshot);
      } else if (/finalized|ordered|delivered/i.test(snapshot.status)) {
        $scope.archivedOrders.push(snapshot);
      }
    }

    myDataRef.on('value', function(resp) {
      var orders = resp.val();
      $scope.orders = [];
      $scope.archivedOrders = [];
      for (var key in orders) {
        if (orders.hasOwnProperty(key)) {
          orders[key].id = key;
          listUpdate(orders[key]);
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
        locals: {event: 'create', base: myDataRef},
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
