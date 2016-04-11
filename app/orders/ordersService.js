(function () {

  'use strict';

  angular.module('MealOrderingSystem').service('ordersService', function () {
    // 'https://fiery-fire-8648.firebaseio.com/'

    function startConnection (base) {
      base = base || '';
      var data = new Firebase('https://fiery-fire-8648.firebaseio.com/' + base);
      return data;
    };

    function pushToDatabase (base, data) {
      console.log(base instanceof Firebase);
      if (base instanceof Firebase) {
        base.push(data);
      } else {
        //throw error
      }
    }

    function updateDatabase(url, key, data) {
      var base = startConnection(url);
      // console.log(url, key, data)
      // var base = new Firebase('https://fiery-fire-8648.firebaseio.com/Active/' + url);
      if (base instanceof Firebase) {
        base.child(key).set(data);
      } else {
        //throw error
      }
    }

    return {
      startConnection: startConnection,
      pushToDatabase: pushToDatabase,
      updateDatabase: updateDatabase
    }

  });

}());
