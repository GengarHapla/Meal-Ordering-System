(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('ordersController', function ($scope) {
  	var tabs = [
	      { title: 'Active orders', content: "Tabs will become paginated if there isn't enough room for them."},
	      { title: 'History of orders', content: "You can swipe left and right on a mobile device to change tabs."}
	    ],
	    selected = null,
	    previous = null;
	var messages = [];
	for (var i = 0; i < 25; i++) {
		messages.push({what: 'Gengar', who: 'Hapla', notes:"He is fucked up"})
	}
	$scope.messages = messages;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      if ( old + 1 && (old != current)) console.log('Goodbye ' + previous.title + '!');
      if ( current + 1 )                console.log('Hello ' + selected.title + '!');
    });
    $scope.addTab = function (title, view) {
      view = view || title + " Content View";
      tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };
  });

}());