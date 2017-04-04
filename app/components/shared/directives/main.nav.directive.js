;(function() {

  'use strict';

  /**
   * Main nav, template HTML
   *
   * Usage:
   * <main-nav><main-nav/>
   */
  angular
    .module('myBoilerplate')
    .directive('mainNav', MainNav);

  function MainNav() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'app/components/shared/directives/main-nav.html'
    };

    return directiveDefinitionObject;
  }

})();