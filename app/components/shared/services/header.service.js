;
(function() {


    'use strict';


    /**
     * Service to show or hide the header
     *
     * Show Header:
     * HeaderService.show();
     * 
     * Hide Header:
     * HeaderService.hide();
     *
     */

    angular
        .module('myBoilerplate')
        .factory('HeaderService', [
            '$rootScope', HeaderService
        ]);

    // factory
    function HeaderService($rootScope) {


        var service = {
            show: show,
            hide: hide
        };

        return service;

        // definition
        function show() {
            $rootScope.showHeader = true;
        }

        function hide() {
            $rootScope.showHeader = false;
        }
    }
})();