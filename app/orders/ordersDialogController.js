(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('ordersDialogController', function ($scope, $mdDialog, locals, ordersService) {
    $scope.show = locals.event;
    $scope.validStatus = ['Finalized', 'Ordered', 'Delivered']
    // $scope.meals = {"-KF4vsHjA08yLq1Yl64U": {meal: 'kraby', price: 21}, "-KF4vsHjA08yLas1Yl64U": {meal: 'kraby', price: 21}, "-KF4aszjA0823q1Yl64U": {meal: 'kraby', price: 21}, };
    console.log($scope.meals)
    console.log($scope.show)
    // $scope.restaurant = '';
    // $scope.notes = '';
    if (locals.event === 'edit') {
      //service here
      $scope.details = locals.details
      $scope.meals = locals.details.meals
      // $scope.items = ordersService.getDetails()
    }
    $scope.closeDialog = function () {
      $mdDialog.hide();
    };
    $scope.addOrder = function (ans) {
      console.log(ans);
      if ($scope.vm.restaurant) {
        $mdDialog.hide(ans);
        var order = {where: $scope.vm.restaurant, who: 'Haplinsky', status: 'new'};
        if ($scope.vm.notes) {
          order.notes = $scope.vm.notes;
        }
        ordersService.pushToDatabase(locals.base, order);
      } else {}
      console.log($scope.vm.restaurant);
      console.log($scope.vm.notes);
      console.log($scope);
    };
    $scope.updateOrder = function (order) {
      console.log(order)
      $mdDialog.hide(order);
      var hapla = new Firebase('https://fiery-fire-8648.firebaseio.com/Active/-KF4R268HoEBKlPGp2oi');
      if ($scope.vm.meal && $scope.vm.price) {
        console.log('meal and price')
        var dest = ordersService.startConnection(order.id + '/meals')
        var meal = {meal: $scope.vm.meal, price: $scope.vm.price}
        ordersService.pushToDatabase(dest, meal);
      }
      if ($scope.vm.status) {
        console.log('status');
        ordersService.updateDatabase(order.id, 'status', $scope.vm.status);
      }
      // hapla.set({test: 'testing'});
      console.log($scope.vm.meal);
      console.log($scope.vm.price);
      console.log($scope.vm.status);
    };
  });

}());
