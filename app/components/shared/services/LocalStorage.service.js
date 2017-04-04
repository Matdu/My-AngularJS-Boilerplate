;(function() {


    'use strict';


    /**
     * LocalStorage function Service
     *
     * var data = { property: 'name'};
     * // set, get, remove, removeAll and list values from localStorage
     * LocalStorage.set('obj', data);
     * LocalStorage.get('obj');
     * LocalStorage.update('obj', data);
     * LocalStorage.remove('obj');
     * LocalStorage.removeAll();
     * LocalStorage.list();
     */
    angular
      .module('myBoilerplate')
      .factory('LocalStorage', [
        '$window', '$rootScope', LocalStorageService
      ]);


    // factory
    function LocalStorageService($window, $rootScope) {

      /**
       * Test browser if it supports localStorage
       */
      var storage = (typeof window.localStorage === 'undefined') ? undefined : window.localStorage,
          supported = !(typeof storage === undefined || typeof window.JSON === undefined);

        /*
        * whenever localStorage gets updated trigger
        * $digest cicle so all values are refreshed in the view
         */
        angular.element($window).on('storage', function(event, name) {
          if (event.key === name) {
            $rootScope.$apply();
          }
        });


        return {
          set: set,
          get: get,
          update: update,
          remove: remove,
          removeAll: removeAll,
          list: list
        };


        // function definitions
        /**
         * Set the value on localStorage and verify if it exists
         *
         * @param {string} name Value name on localStorage
         * @param {object} val  Return the stored value
         */
         function set(name, val) {
           if (!supported) {
               console.log('localStorage not suported, verify if $cookies is supported.');
             }

           // if the same name for a localStorage exists display alert error
           if (window.localStorage.getItem(name) !== null) {
             console.warn('localStorage  with the name ' + name + ' already exists. Use another name.');
           } else {
             return $window.localStorage && $window.localStorage.setItem(name, angular.toJson(val));
           }
         }


         /**
          * getData from localStorage
          *
          * @param  {string} name Name of the value on localStorage
          * @return {*}           Return stored value
          */
         function get(name) {
           if (!supported) {
               console.log('localStorage not suported, verify if $cookies is supported.');
             }

           return $window.localStorage && angular.fromJson($window.localStorage.getItem(name));
         }


         /**
          * Update data on localStorage
          *
          * @param  {string}  name Name of the value on localStorage
          * @param {object}   val  Return stored value
          */
         function update(name, val) {
           if (!supported) {
               console.log('localStorage not suported, verify if $cookies is supported.');
             }

           return $window.localStorage && $window.localStorage.setItem(name, angular.toJson(val));
         }



         /**
          * Remove value from localStorage
          *
          * @param  {string} name Name of the value on localStorage
          * @return {boolean}     True/false if the value was removed
          */
         function remove(name) {
           if (!supported) {
               console.log('localStorage not suported, verify if $cookies is supported.');
           }

           return $window.localStorage && $window.localStorage.removeItem(name);
         }


         /**
          * Remove all values from localStorage
          *
          * @return {boolean}     True/false if they were removed
          */
         function removeAll() {
           if (!supported) {
               console.log('localStorage not suported, verify if $cookies is supported.');
           }

           return $window.localStorage && $window.localStorage.clear();
         }


         /**
          * Retorna object of all values stored on localStorage
          *
          * @return {object}    Objeto with all values stored on localStorage
          */
         function list() {
           return $window.localStorage;
         }

    }


})();
