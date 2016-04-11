(function () {

  'use strict';

  angular.module('MealOrderingSystem').service('ordersService', function () {
    function startConnection (base) {
      base = base || '';
      var data = new Firebase('https://fiery-fire-8648.firebaseio.com/' + base);
      return data;
    }

    function pushToDatabase (base, data) {
      if (base && base instanceof Firebase) {
        base.push(data);
      } else {
        //throw error
      }
    }

    function updateDatabase(url, key, data) {
      if (url && key && data) {
        var base = startConnection(url);
        base.child(key).set(data);
      } else {
        //throw error
      }
    }

    return {
      startConnection: startConnection,
      pushToDatabase: pushToDatabase,
      updateDatabase: updateDatabase
    };

  });

}());
