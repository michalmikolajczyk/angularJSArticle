function MainController() {}

function cleanMeUp($interval, $rootScope, $timeout) {
  var postLink = function (scope, element, attrs) {
    var rootModelListener = $rootScope.$watch('someModel', function () {
      // do something
    });

    var myInterval = $interval(function () {
      // do something in intervals
    }, 2584);

    var myTimeout = $timeout(function () {
      // defer some action here
    }, 1597);

    scope.domElement = element;

    $timeout(function () {
      // calling $destroy manually for testing purposes
      scope.$destroy();
    }, 987);

    // here is where the cleanup happens
    scope.$on('$destroy', function () {
      // disable the listener
      rootModelListener();

      // cancel the interval and timeout
      $interval.cancel(myInterval);
      $timeout.cancel(myTimeout);

      // nullify the variable
      scope.domElement = null;
    });

    element.on('$destroy', function () {
      // this is a jQuery event
      // clean up all vanilla JavaScript / jQuery artifacts here

      // respectful jQuery plugins have $destroy handlers,
      // that is the reason why this event is emitted...
      // follow the standards.
    });
  };

  return {
    link: postLink
  };
}
angular.module('app', [])
.controller('MainController', MainController)
.directive('cleanMeUp', cleanMeUp);