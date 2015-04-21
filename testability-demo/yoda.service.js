'use strict';

function yoda() {

  var privateMethod = function () {
    // this function is not exposed
  };

  var publicMethod1 = function () {
    // this function is exposed, but it's internals are not exposed
    // some logic...
  };

  var publicMethod2 = function (arg) {
    // the below call cannot be spied on
    publicMethod1('someArgument');

    // but this one can!
    hostObject.publicMethod1('aBetterArgument');
  };

  // IF THE LITERAL IS RETURNED THIS WAY, IT CAN'T BE REFERRED TO FROM INSIDE
  // AND WE DON'T WANT TO EXPOSE THE INNER METHODS
  // return {
  //   publicMethod1: function () {
  //     return publicMethod1();
  //   },
  //   publicMethod2: function (arg) {
  //     return publicMethod2(arg);
  //   }
  // };

  var hostObject = {
    publicMethod1: function () {
      return publicMethod1();
    },
    publicMethod2: function (arg) {
      return publicMethod2(arg);
    }
  };

  return hostObject;
}

angular.module('app', [])
.factory('yoda', yoda);