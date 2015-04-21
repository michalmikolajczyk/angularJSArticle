function MainController($scope) {
  this.foo = 1;
  var that = this;
  var setBar = function () {
    // that.bar = {someProperty: 2};
    this.bar = {someProperty: 2};
  };
  setBar.call(this);
  // there are other conventions: 
  // var MC = this;
  // setBar.call(this); when using 'this' inside setBar()
}

function AnotherController() {
  this.text = 'abc';
}

function testForToptal() {
  return {
    controller: 'AnotherController',
    controllerAs: 'AC',
    template: '<p>{{ AC.text }}</p>'
  };
}

angular.module('app', [])
.controller('MainController', MainController)
.controller('AnotherController', AnotherController)
.directive('testForToptal', testForToptal);
