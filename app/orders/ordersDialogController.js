(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('ordersDialogController', function ($scope, $mdDialog, locals, ordersService) {
    $scope.show = locals.event;
    $scope.validStatus = ['Finalized', 'Ordered', 'Delivered'];
    if (locals.event === 'edit') {
      $scope.details = locals.details;
      $scope.meals = locals.details.meals;
    }
    $scope.closeDialog = function () {
      $mdDialog.hide();
    };
    $scope.addOrder = function () {
      if ($scope.vm.restaurant) {
        $mdDialog.hide();
        var order = {where: $scope.vm.restaurant, who: 'Haplinsky', status: 'new'};
        //TODO use real username when OAuth is implemented
        if ($scope.vm.notes) {
          order.notes = $scope.vm.notes;
        }
        ordersService.pushToDatabase(locals.base, order);
      } else {
        $scope.warning = 'Add the restaurant name !';
      }
    };
    $scope.updateOrder = function (order) {
      if ($scope.vm.meal && $scope.vm.price) {
        //TODO forbid user to add more than 1 meal to the order #afterOAuth
        var dest = ordersService.startConnection(order.id + '/meals');
        ordersService.pushToDatabase(dest, {meal: $scope.vm.meal, price: $scope.vm.price});
        $mdDialog.hide();
      }
      if ($scope.vm.status) {
        ordersService.updateDatabase(order.id, 'status', $scope.vm.status);
        $mdDialog.hide();
      }
    };
  });

}());
