function MainController($rootScope, $scope) {
  this.removeDirective = function () {
    $rootScope.$emit('destroyDirective');
  };
}

function testForToptal($rootScope, $timeout) {
  return {
    link: function (scope, element, attributes) {

      var destroyListener = $rootScope.$on('destroyDirective', function () {
        scope.$destroy();
      });

      // adding a timeout for the DOM to get ready
      $timeout(function () {
        scope.toBeDetached = element.find('p');
      });

      scope.$on('$destroy', function () {

        // setting this model to null
        // will solve the problem.
        // scope.toBeDetached = null;

        destroyListener();
        element.remove();
      });
    },
    template: '<div><p>I AM DIRECTIVE</p></div>'
  };
}

angular.module('app', [])
.controller('MainController', MainController)
.directive('testForToptal', testForToptal);
