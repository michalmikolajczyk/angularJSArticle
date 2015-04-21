function MainController($scope) {
  this.foo = 1;
  var that = this;
  console.log('Main Controller executed');
}

function ContentController($state) {
  if ($state.current.name === 'main.product.index') {
    this.content = 'product index page';  
  } else if ($state.current.name === 'main.product.details') {
    this.content = 'details';  
  }
}

function HomepageController() {

}

function IntroController() {
  console.log('Intro Controller executed');
}

function ProductController() {
  console.log('Product Controller executed');
}

function WidgetController($interval) {
  this.counter = 0;
  var that = this;
  $interval(function () {
    that.counter++;
  }, 987);
}

function resolve(index, timeout) {
  return {
    data: function($q, $timeout) {
      var deferred = $q.defer();
      $timeout(function () {
        deferred.resolve(console.log('Data resolve called ' + index));
      }, timeout);
      return deferred.promise;
    }
  };
}

function config($stateProvider) {
  $stateProvider
    // MAIN ABSTRACT STATE, ALWAYS ON
    .state('main', {
      abstract: true,
      url: '/',
      controller: 'MainController as MC',
      templateUrl: '/routing-demo/main.html',
      resolve: resolve(1, 1597)
    })
    // A SIMPLE HOMEPAGE
    .state('main.homepage', {
      url: '',
      controller: 'HomepageController as HC',
      templateUrl: '/routing-demo/homepage.html'
    })
    // A COMPLEX PRODUCT PAGE
    .state('main.product', {
      abstract: true,
      url: ':id',
      views: {
        '@main': {
          controller: 'ProductController as PC',
          templateUrl: '/routing-demo/product.html',
          resolve: resolve(2, 2584)
        },
        // BY DEFINING A CHILD VIEW ALREADY HERE, WE ENSURE IT DOES NOT RELOAD ON CHILD STATE CHANGE
        'widget@main.product': {
          controller: 'WidgetController as PWC',
          templateUrl: '/routing-demo/widget.html' 
        }
      },
    })
    // .state('main.product', {
    //   abstract: true,
    //   url: ':id',
    //   controller: 'ProductController as PC',
    //   templateUrl: '/routing-demo/product.html',
    // })
    // PRODUCT DEFAULT SUBSTATE
    .state('main.product.index', {
      url: '',
      views: {
        // SET IN PARENT STATE
        // 'widget': {
        //   controller: 'WidgetController as PWC',
        //   templateUrl: '/routing-demo/widget.html' 
        // },
        'intro': {
          controller: 'IntroController as PIC',
          templateUrl: '/routing-demo/intro.html'
        },
        'content': {
          controller: 'ContentController as PCC',
          templateUrl: '/routing-demo/content.html'
        }
      },
      resolve: resolve(3, 987)
    })
    // PRODUCT DETAILS SUBSTATE
    .state('main.product.details', {
      url: '/details',
      views: {
        // 'widget': {
        //   controller: 'WidgetController as PWC',
        //   templateUrl: '/routing-demo/widget.html' 
        // },
        'content': {
          controller: 'ContentController as PCC',
          templateUrl: '/routing-demo/content.html'
        }
      }
    });

}

function resolve(index, timeout) {
  return {
    data: function($q, $timeout) {
      var deferred = $q.defer();
      $timeout(function () {
        deferred.resolve(console.log('Data resolve called ' + index));
      }, timeout);
      return deferred.promise;
    }
  };
}

function configResolves($stateProvide) {
  $stateProvider
    // MAIN ABSTRACT STATE, ALWAYS ON
    .state('main', {
      // abstract: true,
      url: '/',
      controller: 'MainController as MC',
      templateUrl: '/routing-demo/main.html',
      resolve: resolve(1, 1597)
    })
    // A COMPLEX PRODUCT PAGE
    .state('main.product', {
      // abstract: true,
      url: ':id',  
      controller: 'ProductController as PC',
      templateUrl: '/routing-demo/product.html',
      resolve: resolve(2, 2584)
    })
    // PRODUCT DEFAULT SUBSTATE
    .state('main.product.index', {
      url: '',
      views: {
        'intro': {
          controller: 'IntroController as PIC',
          templateUrl: '/routing-demo/intro.html'
        },
        'content': {
          controller: 'ContentController as PCC',
          templateUrl: '/routing-demo/content.html'
        }
      },
      resolve: resolve(3, 987)
    });
}

angular.module('app', [
  'ui.router'
])
.config(config)
.controller('MainController', MainController)
.controller('ContentController', ContentController)
.controller('HomepageController', HomepageController)
.controller('IntroController', IntroController)
.controller('ProductController', ProductController)
.controller('WidgetController', WidgetController);
