(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('ordersDialogController', function ($rootScope, $scope, $mdDialog, locals, ordersService) {

    var username = $rootScope.user.name;
    $scope.show = locals.event;
    $scope.validStatus = ['Finalized', 'Ordered', 'Delivered'];
    if (locals.event === 'edit') {
      $scope.details = locals.details;
      $scope.meals = locals.details.meals;
    }

    function validateUser (val, user) {
      for (var key in val) {
        if (val.hasOwnProperty(key)) {
          if (val[key].added_by === user) {
            return false
          }
        }
      }
      return true
    }

    $scope.closeDialog = function () {
      $mdDialog.hide();
    };

    $scope.addOrder = function () {
      if ($scope.vm.restaurant) {
        $mdDialog.hide();
        var order = {where: $scope.vm.restaurant, who: username, status: 'new'};
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
        if (validateUser($scope.meals, username)) {
          var dest = ordersService.startConnection(order.id + '/meals');
          ordersService.pushToDatabase(dest, {meal: $scope.vm.meal, price: $scope.vm.price, added_by: username});
          $mdDialog.hide();
        } else {
          $scope.warning = 'You have added you meal already !';
        }
      }
      if ($scope.vm.status) {
        ordersService.updateDatabase(order.id, 'status', $scope.vm.status);
        $mdDialog.hide();
      }
    };
    
  });

}());
