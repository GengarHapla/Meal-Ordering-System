(function () {

  'use strict';

  describe('ordersDialogController', function () {

    var $rootScope, $scope, $mdDialog, locals, ordersService, createController;

    beforeEach(function () {

      module('MealOrderingSystem');

      inject(function ($injector) {
        $rootScope  = $injector.get('$rootScope');
        ordersService = $injector.get('ordersService');
        var $controller = $injector.get('$controller');

        $scope = $rootScope.$new();
        $mdDialog = {};
        $mdDialog.hide = sinon.stub();
        locals = {};
        ordersService = {};
        ordersService.pushToDatabase = sinon.stub();
        ordersService.startConnection = sinon.stub();
        ordersService.updateDatabase = sinon.stub();

        $rootScope.user = {
          name: 'Test User'
        };

        createController = function () {
          return $controller('ordersDialogController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $mdDialog: $mdDialog,
            locals: locals,
            ordersService: ordersService
          });
        };

      });


    });

    describe('should expose', function () {

      beforeEach(function () {
        createController();
      });
      
      it('valid statuses to $scope', function () {
        expect($scope.validStatus).to.eql(['Finalized', 'Ordered', 'Delivered']);
      });

      context('should expose addOrder to $scope', function () {
        
        it('that is a function', function () {
          expect($scope).to.have.property('closeDialog').that.is.a('function');
        });

        it('and calls $mdDialog.hide', function () {
          $scope.closeDialog();
          expect($mdDialog.hide).to.have.been.calledOnce;
        });

      });

    });


    describe('validateUser', function () {

      beforeEach(function () {
        locals.details = {
          meals: {
            '-KF5IZQd6zBRUiMRUwqu': {
              meal: 'Example Meal',
              added_by: 'testing',
              price: 10
            }
          }
        };
        createController();
      });
      
      it('should return true for uniqueness', function () {
        createController();
        expect($scope.validateUser(locals.details.meals, 'test user')).to.be.ok;
      });    

      it('should return false for non uniqueness', function () {
        createController();
        expect($scope.validateUser(locals.details.meals, 'testing')).to.not.be.ok;
      });

    });

    describe('when editing', function () {

      beforeEach(function () {
        locals.event = 'edit';
        locals.details = {
          meals: {
            '-KF5IZQd6zBRUiMRUwqu': {
              meal: 'Example Meal',
              added_by: 'testing',
              id: '-KF5IZQd6zBRUiMRUwqu',
              price: 10
            }
          }
        };
        createController();
      });

      it('should expose show to $scope', function () {
        expect($scope.show).to.eql('edit');
      });

      it('should expose details to $scope', function () {
        expect($scope.details).to.eql(locals.details);
      });

      it('should expose meals to $scope', function () {
        expect($scope.meals).to.eql(locals.details.meals);
      });

      context('$scope.updateOrder', function () {

        it('should not do anything when no values filled', function () {
          $scope.updateOrder();
          expect($mdDialog.hide).to.not.have.been.called;
        });

        it('should add meal with price when unique user', function () {
          $scope.vm = {};
          $scope.vm.meal = 'Test Meal';
          $scope.vm.price = 88;
          $scope.updateOrder(locals.details);
          expect(ordersService.pushToDatabase).to.have.been.calledWith(ordersService.startConnection(), 
            {meal: 'Test Meal', price: 88, added_by: $rootScope.user.name});
          expect($mdDialog.hide).to.have.been.calledOnce;
        });

        it('should not add meal with price when not unique user', function () {
          $scope.vm = {};
          $scope.vm.meal = 'Test Meal';
          $scope.vm.price = 88;
          $rootScope.user.name = 'testing';
          createController();
          $scope.updateOrder(locals.details);
          expect($scope.warning).to.equal('You have added your meal already !');
        });

        it('should change the status', function () {
          $scope.vm = {};
          $scope.vm.status = 'finalized';
          createController();
          $scope.updateOrder(locals.details.meals['-KF5IZQd6zBRUiMRUwqu']);
          expect(ordersService.updateDatabase).to.have.been.calledWith('-KF5IZQd6zBRUiMRUwqu', 'status', 'finalized');
          expect($mdDialog.hide).to.have.been.calledOnce;
        });

      });

      
    });

    describe('when adding', function () {

      beforeEach(function () {
        locals.event = 'add';
        createController();
      });
      
      it('should expose show to $scope', function () {
        expect($scope.show).to.eql('add');
      });

      context('$scope.addOrder', function () {

        it('should display a warning when no values filled', function () {
          $scope.addOrder();
          expect($scope.warning).to.eql('Add the restaurant name !');
        });

        it('should add the new order when restaurant supplied', function () {
          $scope.vm = {};
          $scope.vm.restaurant = 'Test Restaurant';
          $scope.addOrder();
          expect(ordersService.pushToDatabase).to.have.been.calledWith(ordersService.startConnection(), 
            {where: 'Test Restaurant', who: 'Test User', status: 'new'});
          expect($mdDialog.hide).to.have.been.calledOnce;
        });

        it('should add the new order with notes when restaurant and notes supplied', function () {
          $scope.vm = {};
          $scope.vm.restaurant = 'Test Restaurant';
          $scope.vm.notes = 'Test note';
          $scope.addOrder();
          expect(ordersService.pushToDatabase).to.have.been.calledWith(ordersService.startConnection(), 
            {where: 'Test Restaurant', who: 'Test User', status: 'new', notes: 'Test note'});
          expect($mdDialog.hide).to.have.been.calledOnce;
        });

      });

    });

  });

}());
