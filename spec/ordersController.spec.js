(function () {

  'use strict';

  describe('ordersController', function () {

    var $rootScope, $scope, $httpBackend, $mdDialog, $mdToast, createController;

    var ordersService, exampleOrder, parentEl;

    beforeEach(function () {

      module('MealOrderingSystem');

      inject(function ($injector) {
        $rootScope  = $injector.get('$rootScope');
        $httpBackend = $injector.get('$httpBackend');
        var $controller = $injector.get('$controller');

        $scope = $rootScope.$new();
        $mdDialog = {};
        $mdDialog.show = sinon.stub();
        $mdToast = {};
        $mdToast.show = sinon.stub();
        $mdToast.simple = sinon.stub().returns({
          textContent: sinon.stub().returns({
            position: sinon.stub().returns({
              hideDelay: sinon.stub().returns({
                capsule: sinon.stub()
              })
            })})});

        ordersService = {startConnection: sinon.stub().returns({on: sinon.stub()})};
    
        $rootScope.user = {
          name: 'Test User'
        };

        createController = function () {
          return $controller('ordersController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $mdDialog: $mdDialog,
            $mdToast: $mdToast,
            ordersService: ordersService
          });
        };

      });
    });

    beforeEach(function () {
      createController();
    });

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation(false);
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call $mdToast.show when logged in', function () {
      $rootScope.$emit('logged');
      expect($mdToast.show).to.have.been.calledWith($mdToast.simple().textContent('Welcome '+$rootScope.user.name).position('top').hideDelay(10000).capsule(true));
    });

    it('should not call $mdToast.show when not logged in', function () {
      expect($mdToast.show).to.have.not.been.calledOnce;
    });

    it('should fill $scope.tabs with tabs', function () {
      expect($scope.tabs).to.deep.equal([{ title: 'Active orders'}, { title: 'History of orders'}]);
    });

    it('should set $scope.selectedIndex at 0', function () {
      expect($scope.selectedIndex).to.equal(0);
    });

    it('should have createOrder function', function () {
      expect($scope.createOrder).to.be.a('function');
    });

    it('should have orderDetails function', function () {
      expect($scope.orderDetails).to.be.a('function');
    });

    it('should have safeApply function', function () {
      expect($scope.safeApply).to.be.a('function');
    });

    it('should have listUpdate function', function () {
      expect($scope.listUpdate).to.be.a('function');
    });

    context('listUpdate', function () {

      it('should add item with status new to $scope.orders', function () {
        var order = {status: 'new'};
        $scope.orders = [];
        $scope.listUpdate(order);
        expect($scope.orders[0]).to.eql(order);
      });

      context('should add to $scope.archivedOrders item with status', function (){

        beforeEach(function () {
          $scope.archivedOrders = [];
        });

        it('finalized', function() {
          var order = {status: 'finalized'};
          $scope.listUpdate(order);
          expect($scope.archivedOrders[0]).to.eql(order);
        });

        it('ordered', function() {
          var order = {status: 'ordered'};
          $scope.listUpdate(order);
          expect($scope.archivedOrders[0]).to.eql(order);
        });

        it('delivered', function() {
          var order = {status: 'delivered'};
          $scope.listUpdate(order);
          expect($scope.archivedOrders[0]).to.eql(order);
        });

      });

    });

    context('Firebase on event value', function () {

      beforeEach(function () {
        $scope.safeApply = sinon.stub();
        exampleOrder = {'-KF5ITnACQjwxkfPuxdb': {
          status: 'new',
          where: 'Example Restaurant',
          who: 'A hungry person',
          meals: {
            '-KF5IZQd6zBRUiMRUwqu': {
              meal: 'Example Meal',
              price: 10
            }
          }
        }};
      });

      var initiate = function () {
        $scope.myDataRef.on.withArgs('value').yield({ val: sinon.stub() });
      };

      it('should create $scope.orders', function() {
        initiate();
        expect($scope.orders).to.eql([]);
      });

      it('should create $scope.archivedOrders', function() {
        initiate();
        expect($scope.archivedOrders).to.eql([]);
      });

      context('should update', function () {

        afterEach(function () {
          expect($scope.safeApply).to.have.been.calledOnce;
        });

        var initiate = function () {
          $scope.myDataRef.on.withArgs('value').yield({ val: sinon.stub().returns(exampleOrder) });
        };

        it('the orders list', function() {
          initiate();
          expect($scope.orders[0]).to.eql(exampleOrder['-KF5ITnACQjwxkfPuxdb'])
        });

        it('the archived list', function() {
          exampleOrder['-KF5ITnACQjwxkfPuxdb'].status = 'finalized';
          initiate();
          expect($scope.archivedOrders[0]).to.eql(exampleOrder['-KF5ITnACQjwxkfPuxdb'])
        });

      });


    });

    context('$scope.createOrder', function () {

      it('should fire $mdDialog.show', function() {
        var parentEl = angular.element(document.body);
        $scope.createOrder('event');
        expect($mdDialog.show).to.have.been.calledWith({
          parent: parentEl,
          targetEvent: 'event',
          locals: {event: 'create', base: $scope.myDataRef},
          preserveScope: true,
          templateUrl: 'app/orders/ordersDialog.html',
          controller: 'ordersDialogController',
          controllerAs: 'vm'
       });
      });

    });

    context('$scope.orderDetails', function () {

      beforeEach(function () {
        parentEl = angular.element(document.body);
        $scope.orders = ['test'];
        $scope.archivedOrders = ['test'];
      });

      it('should fire $mdDialog.show with $scope.orders', function() {
        $scope.orderDetails('event', 0);
        expect($mdDialog.show).to.have.been.calledWith({
          parent: parentEl,
          targetEvent: 'event',
          locals: {event: 'edit', details: $scope.orders[0]},
          preserveScope: true,
          templateUrl: 'app/orders/ordersDialog.html',
          controller: 'ordersDialogController',
          controllerAs: 'vm'
       });
      });

      it('should fire $mdDialog.show with $scope.archivedOrders', function() {
        $scope.orderDetails('event', 0, true);
        expect($mdDialog.show).to.have.been.calledWith({
          parent: parentEl,
          targetEvent: 'event',
          locals: {event: 'edit', details: $scope.archivedOrders[0]},
          preserveScope: true,
          templateUrl: 'app/orders/ordersDialog.html',
          controller: 'ordersDialogController',
          controllerAs: 'vm'
       });
      });

    });

  });

}());
