function MainController($interval) {
  this.foo = {
    bar: 1
  };
  this.baz = 1;
  var that = this;
  $interval(function () {
    that.foo.bar++;
  }, 144);

  $interval(function () {
    that.baz++;
  }, 144);

  this.quux = [1,2,3];
}

function isolatedScopeDirective() {

  return {
    link: function (scope) {
      scope.isolatedModel = 'some value';
    },
    scope: {}
  };
}

function anotherIsolatedScopeDirective() {

  return {
    scope: {}
  };
}

function AnotherController() {}

function testDirective() {
  var postLink = function (scope, element, attrs) {
    scope.$watch(attrs.watchAttribute, function (newVal) {
      if (newVal) {
        // take a look in the console
        // we can't use the attribute directly
        console.log(attrs.watchAttribute);

        // the newVal is evaluated, and it can be used
        scope.modifiedFooBar = newVal.bar * 10;
      }
    }, true);

    attrs.$observe('observeAttribute', function (newVal) {
      scope.observed = newVal;
    });
  };

  return {
    link: postLink,
    templateUrl: '/attributes-demo/test-directive.html'
  };
}

angular.module('app', [])
.controller('MainController', MainController)
.controller('AnotherController', AnotherController)
.directive('testDirective', testDirective)
.directive('isolatedScopeDirective', isolatedScopeDirective)
.directive('anotherIsolatedScopeDirective', anotherIsolatedScopeDirective);
