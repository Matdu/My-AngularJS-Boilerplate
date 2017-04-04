/**
 * 
 * MyBoilerplate
 * @description           MyBoilerplate
 * @version               1.0.0
 * 
 */
;
(function() {


    /**
     * App Module definition and it's dependencies
     * */
    angular
        .module('myBoilerplate', [
            'ngRoute',
            'ngSanitize',
            'ngAnimate',
            'ui.utils.masks',
            '19degrees.ngSweetAlert2',
            'satellizer'
        ])
        .config(config);

    // secure depencency injection
    // to prevent minification problems
    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', '$provide', '$authProvider'];

    function config($routeProvider, $locationProvider, $httpProvider, $compileProvider, $provide, $authProvider) {
        // google oauth example
        $authProvider.google({
            clientId: '',
            url: '/',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin,
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            oauthType: '2.0',
            popupOptions: { width: 452, height: 633 }
        });

        $authProvider.tokenName = 'token';

        /**
         * Routes
         *
         */
        $routeProvider
            .when('/', {
                templateUrl: 'app/components/main/main.html',
                controller: 'MainController',
                controllerAs: 'main',
                access: { requiresLogin: false }
            })
            .otherwise({
                redirectTo: '/'
            });

        // $httpProvider.interceptors.push('authInterceptor');
        $locationProvider.html5Mode(true);

    }


    /**
     * Intercept any request or response inside authInterceptor
     * or to handle what should be happenning when errors occurs 40x, 50x etc.
     * 
     */
    angular
        .module('myBoilerplate')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

    function authInterceptor($rootScope, $q, LocalStorage, $location) {

        return {

            // intercept every request
            request: function(config) {
                config.headers = config.headers || {};
                return config;
            },

            // Catch 404 errors
            responseError: function(response) {
                if (response.status === 404) {
                    $location.path('/');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }


    /**
     * Run Block
     */
    angular
        .module('myBoilerplate')
        .run(run);

    run.$inject = ['$rootScope', '$location', 'LocalStorage', 'LoadingService', 'HeaderService'];

    function run($rootScope, $location, LocalStorage, LoadingService, HeaderService) {

        // put here what should run when the page loads
        /* Hide loading service */
        LoadingService.hide();

        /* Hide header service */
        HeaderService.hide();

        /* validate restricted access pages */
        // $rootScope.$on('$routeChangeStart', function(event, next, current) {

        //     /* get user information stored in localStorage */
        //     $rootScope.globals = LocalStorage.get('user') || {};

        //     /* verify if the actual page is /login */
        //     if ($location.path() === '/login') {
        //         HeaderService.hide();
        //     } else {
        //         HeaderService.show();
        //     }

        //     /* verify if there's an 'access' argument on route */
        //     if (next.access !== undefined) {

        //         // validate which pages doesn't need login
        //         if (next.access.requiresLogin && !$rootScope.globals.user) {
        //             HeaderService.hide();
        //             $location.path('/login');
        //         }
        //     }

        //     // verify if the user is already logged
        //     if ($rootScope.globals.user && $location.path() === '/login') {
        //         $location.path('/home');
        //     }
        // });
    }
})();