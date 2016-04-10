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
	// var messages = [];
	// for (var i = 0; i < 2; i++) {
	// 	messages.push({where: 'Chinesse restaurant', who: 'Gengar Hapla', notes:"Ordering at 1 PM"})
	// }

	// Create a service for it, and think where to put the socket.on
  	// var myDataRef = new Firebase('https://picttve3x4r.firebaseio-demo.com/active');
    var myDataRef = ordersService.startConnection('Active');
    // myDataRef.push()
    // ordersService.pushToDatabase(myDataRef, {where: 'Chinesse restaurant', who: 'Gengar Hapla', notes:"Ordering at 22 PM"})
    myDataRef.on('value', function(resp) {
      console.log(resp.val());
    })
  	myDataRef.on('child_added', function(snapshot) {
	  	console.log(!$scope.messages)
	  	console.log(snapshot.val())
	  if (!$scope.messages) {
      console.log('hapla');
	  	$scope.messages = [];
  		$scope.messages.push(snapshot.val());
	  	$scope.$apply();
	  } else {
	  	$scope.messages.push(snapshot.val());
	  }
	});
	// $scope.messages = [];
	// $scope.messages.push({where: 'Chinesse restaurant', who: 'Gengar Hapla', notes:"Ordering at 2 PM"});

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
       console.log($scope.vm);
       console.log($scope);
       console.log(answer);
     }, function() {
       console.log('canceled');
     });
    }

    $scope.orderDetails = function ($event, index) {
       $scope.items = [1,2,3,4,5,6];
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         locals: {event: 'edit', details: $scope.messages[index]},
         templateUrl: 'app/orders/ordersDialog.html',
         controller: 'ordersDialogController'
      });
    	console.log(index);
    	// myDataRef.push({where: 'Chinesse restaurant', who: 'Gengar Hapla', notes:"Ordering at 2 PM"});
    	// var content = 'Where: '+$scope.messages[index].where+',\n Who: '+$scope.messages[index].who+',\n Notes: '+$scope.messages[index].notes;
	    // var confirm = $mdDialog.prompt()
	    //       .title('You are viewing an active order')
	    //       .textContent(content)
	    //       .placeholder('Your meal')
	    //       .ariaLabel('Meal')
	    //       .targetEvent(event)
	    //       .ok('Add to the order')
	    //       .cancel('Cancel');
	    // $mdDialog.show(confirm).then(function(result) {
	    //   console.log(result)
	    // }, function() {
	    //   console.log('canceled')
	    // });
    }

  });

}());
