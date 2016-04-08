(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('ordersController', function ($scope, $mdDialog) {
  	var tabs = [
	      { title: 'Active orders', content: "Here you can see active orders"},
	      { title: 'History of orders', content: "Here you can see history of orders"}
	    ],
	    selected = null,
	    previous = null;
	// var messages = [];
	// for (var i = 0; i < 2; i++) {
	// 	messages.push({where: 'Chinesse restaurant', who: 'Gengar Hapla', notes:"Ordering at 1 PM"})
	// }

	// Create a service for it, and think where to put the socket.on
  	var myDataRef = new Firebase('https://picttve3x4r.firebaseio-demo.com/active');
  	myDataRef.on('child_added', function(snapshot) {
	  	console.log(!$scope.messages)
	  	console.log(snapshot.val())
	  if (!$scope.messages) {
	  	$scope.messages = [];
		$scope.messages.push(snapshot.val());
	  	$scope.$apply();
	  } else {
	  	$scope.messages.push(snapshot.val());
	  }
	});
	$scope.messages = [];
	$scope.messages.push({where: 'Chinesse restaurant', who: 'Gengar Hapla', notes:"Ordering at 2 PM"});

    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      if ( old + 1 && (old != current)) console.log('Goodbye ' + previous.title + '!');
      if ( current + 1 )                console.log('Hello ' + selected.title + '!');
    });

    $scope.orderDetails = function (event, index) {
    	console.log(index);
    	// myDataRef.push({where: 'Chinesse restaurant', who: 'Gengar Hapla', notes:"Ordering at 2 PM"}); 
    	var content = 'Where: '+$scope.messages[index].where+',\n Who: '+$scope.messages[index].who+',\n Notes: '+$scope.messages[index].notes;
	    var confirm = $mdDialog.prompt()
	          .title('You are viewing an active order')
	          .textContent(content)
	          .placeholder('Your meal')
	          .ariaLabel('Meal')
	          .targetEvent(event)
	          .ok('Add to the order')
	          .cancel('Cancel');
	    $mdDialog.show(confirm).then(function(result) {
	      console.log(result)
	    }, function() {
	      console.log('canceled')
	    });
    }

  });

}());