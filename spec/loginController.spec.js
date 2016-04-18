(function () {

  'use strict';

  describe('loginController', function () {

    var $rootScope, $scope, $state, createController;

    beforeEach(function () {

      module('MealOrderingSystem');

      inject(function ($injector) {
        $rootScope  = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');

        $scope = $rootScope.$new();
        $state = {};
        $state.go = sinon.stub();

        createController = function() {
          return $controller('loginController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $state: $state
          });
        };

      });

    });

    beforeEach(function () {
      createController();
    });

    it('should have performLogin function exposed to $scope', function() {
      expect($scope).to.have.property('performLogin').that.is.a('function');
    });

    context('performLogin', function() {
      
      it('should call $state.go', function() {
        $scope.performLogin();
        expect($state.go).to.have.been.calledWith('orders');
      });

    });

  });

}());
