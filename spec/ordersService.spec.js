(function () {

  'use strict';

  describe('ordersService', function () {

    var ordersService, Firebase, $httpBackend;

    beforeEach(function () {

      Firebase = sinon.stub();

      module('MealOrderingSystem', function ($provide) {
        $provide.value('Firebase', Firebase);
      });

      inject(function ($injector) {
        ordersService = $injector.get('ordersService');
        $httpBackend = $injector.get('$httpBackend');
      });

    });

    beforeEach(function () {

    });

    it('should exist', function() {
      expect(ordersService).to.be.an('object');
    });

    it('should exist with a startConnection method', function() {
      expect(ordersService).to.have.property('startConnection').that.is.a('function');
    });

    it('should exist with a pushToDatabase method', function() {
      expect(ordersService).to.have.property('pushToDatabase').that.is.a('function');
    });

    it('should exist with a updateDatabase method', function() {
      expect(ordersService).to.have.property('updateDatabase').that.is.a('function');
    });

  });

}());
