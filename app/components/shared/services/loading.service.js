;
(function() {


    'use strict';


    /**
     * Service to show or hide the loader
     *
     * Show Loading:
     * LoadingService.show();
     * 
     * Hide Loading:
     * LoadingService.hide();
     *
     */

    angular
        .module('myBoilerplate')
        .factory('LoadingService', [
            '$rootScope', LoadingService
        ]);

    // factory
    function LoadingService($rootScope) {


        var service = {
            show: show,
            hide: hide
        };

        return service;

        // definition
        function show() {
            $rootScope.showLoading = true;
        }

        function hide() {
            $rootScope.showLoading = false;
        }
    }
})();