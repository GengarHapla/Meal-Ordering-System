(function () {

  'use strict';

  angular.module('MealOrderingSystem').service('ordersService', function () {
    // 'https://fiery-fire-8648.firebaseio.com/'

    function startConnection (base) {
      var data = new Firebase('https://fiery-fire-8648.firebaseio.com/' + base);
      return data;
    };

    function pushToDatabase (base, data) {
      console.log(base instanceof Firebase);
      base.push(data);
    }

    function functionName() {

    }

    return {
      startConnection: startConnection,
      pushToDatabase: pushToDatabase
    }

  });

}());
