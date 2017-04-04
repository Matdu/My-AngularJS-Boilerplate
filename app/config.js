;
(function() {


    /**
     * Place to store API URL or any other constant
     * Usage:
     *
     * Inject the service CONSTANTS as a dependency and use it as:
     * CONSTANTS.API_URL
     */
    angular
        .module('myBoilerplate')
        .constant('CONSTANTS', {
            'API_URL': 'http://my-API-URL.com/endpoint'
        });
})();