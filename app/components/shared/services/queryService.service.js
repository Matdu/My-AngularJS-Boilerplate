;
(function() {


    'use strict';


    /**
     * $http abstraction service to execute API calls with any HTTP method,
     * custom url and data objects to be sent as requests.
     * Every REST call is measured, and that way tou can observe how long it took on console
     *
     * QueryService.query('GET', 'users/user/', {get: query}, {post: params})
        .then(function(data) {
          console.log(data);
        }, function(error) {
          console.log(error);
        });
     *
     * @param     {String} method HTTP, ie. 'PUT', 'GET'...
     * @param     {String} endpoint of API url, ie. 'users/user' or 'system-properties'
     * @param     {Object} params String map or objects that will be transformed 
     *                     in `?key1=value1&key2=value2` after url. If the value
     *                     is not a string it'll be transformed in a JSON
     * @return    {Object} data Data to be sent as a data inside the request
     */


    angular
        .module('myBoilerplate')
        .factory('QueryService', [
            '$http', '$q', 'CONSTANTS', QueryService
        ]);



    // factory
    function QueryService($http, $q, CONSTANTS) {


        var service = {
            query: query
        };

        return service;


        // definition
        function query(method, url, params, data, headers) {

            var deferred = $q.defer();

            $http({
                method: method,
                url: CONSTANTS.API_URL + url,
                params: params,
                data: data,
                headers: headers
            }).then(function(data) {
                if (!data.config) {
                    console.log('An error has occurred on server.');
                }
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

    }


})();