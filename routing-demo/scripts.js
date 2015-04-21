function MainController($scope) {
  this.foo = 1;
  var that = this;
  console.log('test');
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
}

function ProductController() {
}

function WidgetController($interval) {
  this.counter = 0;
  var that = this;
  $interval(function () {
    that.counter++;
  }, 987);
}

function config($stateProvider) {
  $stateProvider
    // MAIN ABSTRACT STATE, ALWAYS ON
    .state('main', {
      abstract: true,
      url: '/',
      controller: 'MainController as MC',
      templateUrl: '/routing-demo/main.html'
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
          templateUrl: '/routing-demo/product.html' 
        },
        // BY DEFINING A CHILD VIEW ALREADY HERE, WE ENSURE IT DOES NOT RELOAD ON CHILD STATE CHANGE
        'widget@main.product': {
          controller: 'WidgetController as PWC',
          templateUrl: '/routing-demo/widget.html' 
        }
      }
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
      }
    })
    // PRODUCT DETAILS SUBSTATE
    .state('main.product.details', {
      url: '/details',
      views: {
        'content': {
          controller: 'ContentController as PCC',
          templateUrl: '/routing-demo/content.html'
        }
      }
    });

}

angular.module('articleApp', [
  'ui.router'
])
.config(config)
.controller('MainController', MainController)
.controller('ContentController', ContentController)
.controller('HomepageController', HomepageController)
.controller('IntroController', IntroController)
.controller('ProductController', ProductController)
.controller('WidgetController', WidgetController);
