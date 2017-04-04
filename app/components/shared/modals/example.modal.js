;(function() {


  'use strict';

  /**
   * Example modal
   *
   * Uso:
   * <example-modal></example-modal>
   */
  angular.module('myBoilerplate')
    .directive('exampleModal', exampleModal);


  function exampleModal() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'app/components/shared/modals/example.html',
    };

    return directiveDefinitionObject;
  }


})();