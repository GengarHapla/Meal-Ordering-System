(function () {

  'use strict';

  angular.module('MealOrderingSystem').controller('ordersDialogController', function ($scope, $mdDialog, locals, ordersService) {
    $scope.show = locals.event;
    // $scope.restaurant = '';
    // $scope.notes = '';
    if (locals.event === 'edit') {
      //service here
      $scope.details = locals.details
      // $scope.items = ordersService.getDetails()
    }
    $scope.closeDialog = function () {
      $mdDialog.hide();
    };
    $scope.addOrder = function (ans) {
      console.log(ans);
      $mdDialog.hide(ans);
      var message = {where: $scope.vm.restaurant, who: 'Haplinsky', notes: $scope.vm.notes};
      ordersService.pushToDatabase(locals.base, message);
      console.log($scope.vm.restaurant);
      console.log($scope.vm.notes);
      console.log($scope);
    };
    $scope.updateOrder = function () {

    };
  });

}());
