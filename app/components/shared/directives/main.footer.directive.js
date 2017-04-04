;(function() {

  'use strict';

  /**
   * Main footer, template HTML
   *
   * Usage:
   * <main-footer><main-footer/>
   */
  angular
    .module('myBoilerplate')
    .directive('mainFooter', MainFooter);

  function MainFooter() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'app/components/shared/directives/main-footer.html'
    };

    return directiveDefinitionObject;
  }

})();