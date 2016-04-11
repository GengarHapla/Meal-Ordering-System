(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('ordersController', function ($scope, $mdDialog, ordersService) {
  	var tabs = [
	      { title: 'Active orders', content: "Here you can see active orders"},
	      { title: 'History of orders', content: "Here you can see history of orders"}
	    ],
	    selected = null,
	    previous = null;
    var parentEl = angular.element(document.body);

    var myDataRef = ordersService.startConnection();
    console.log(myDataRef)

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
      // console.log(snapshot.val())
      // $scope.orders = $scope.orders || [];
      // $scope.archivedOrders = $scope.archivedOrders || [];
      if (snapshot.status === 'new') {
        // console.log(snapshot.val())
        $scope.orders.push(snapshot);
      } else if (/finalized|ordered|delivered/i.test(snapshot.status)) {
        // console.log(snapshot)
        // console.log('history')
        $scope.archivedOrders.push(snapshot);
        // $scope.$apply();
      }  
    }

    var primaryOrdersTable = [];

    myDataRef.on('value', function(resp) {
      // console.log(resp.val());
      var orders = resp.val();
      $scope.orders = [];
      $scope.archivedOrders = [];
      for (var key in orders) {
        // console.log(key);
        // console.log(orders[key])
        orders[key].id = key;
        listUpdate(orders[key])
        // primaryOrdersTable.push(orders[key])
      }
      // listUpdate(resp);
      // $scope.orders = resp.val()
      console.log($scope.orders)
      console.log($scope.archivedOrders)
      $scope.safeApply();
    });
    //TODO: Use caching system

    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      if ( old + 1 && (old != current)) console.log('Goodbye ' + previous.title + '!');
      if ( current + 1 )                console.log('Hello ' + selected.title + '!');
    });

    $scope.createOrder = function ($event) {
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        locals: {event: 'create', base: myDataRef},
        preserveScope: true,
        templateUrl: 'app/orders/ordersDialog.html',
        controller: 'ordersDialogController',
        controllerAs: 'vm'
     }).then(function (answer) {
       console.log(answer);
     }, function() {
       console.log('canceled');
     });
    }

    $scope.orderDetails = function ($event, index, archived) {
       if (archived) {
        var details = $scope.archivedOrders[index];
       } else {
        var details = $scope.orders[index];
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
    	console.log(index);
    }

  });

}());
