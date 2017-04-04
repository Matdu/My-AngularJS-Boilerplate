/**
 * Main Controller
 */
;
(function() {

    angular
        .module('myBoilerplate')
        .controller('MainController', MainController);

    MainController.$inject = ['LocalStorage', 'QueryService', 'sweetAlert', '$timeout', '$location'];


    function MainController(LocalStorage, QueryService, sweetAlert, $timeout, $location) {

        // syntax 'controller as'
        var self = this;

        // variables
        self.example = [{ name: 'Matdu', message: 'Oh, hello' },{ name: 'Matdu', message: 'Oh, hope you like it' }];

        //functions
    }
})();