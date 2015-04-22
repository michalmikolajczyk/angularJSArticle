function MainController($scope, $timeout) {
  this.maxPrice = '100';
  this.price = '55';
  this.priceTemporary = '55';
  console.log('test');

  $scope.$watch('MC.price', function (newVal) {
    if (!isNaN(newVal)) {
      for (var i = 0; i < 987; i++) {
        console.log('ALL YOUR BASE ARE BELONG TO US');
      }
    }
  });

  var timeoutInstance;
  $scope.$watch('MC.priceTemporary', function (newVal) {
    if (!isNaN(newVal)) {
      if (timeoutInstance) {
        $timeout.cancel(timeoutInstance);
      }

      timeoutInstance = $timeout(function () {
        $scope.MC.price = newVal;
      }, 144);
      
    }
  });

}

angular.module('app', [
  'ui-rangeSlider'
])
.controller('MainController', MainController);