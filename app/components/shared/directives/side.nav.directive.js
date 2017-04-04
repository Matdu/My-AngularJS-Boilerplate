;(function() {


  'use strict';

  /**
   * Responsive Navigation
   *
   * Uso:
   * <responsive-nav></responsive-nav>
   */
  angular.module('myBoilerplate')
    .directive('sideNav', sideNav);


  function sideNav() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'app/components/shared/directives/side-nav.html',
    };

    return directiveDefinitionObject;
  }


})();