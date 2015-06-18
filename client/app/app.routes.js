(function(){

    angular.module('trApp')
    
    .config(function($routeProvider) {
    
    $routeProvider.when('/', {
          templateUrl: 'app/components/landing/landing.html',
          controller: 'LandingPageController'
      })

    $routeProvider.when('/sign-in', {
          templateUrl: 'app/components/sign-in/sign-in.html',
          controller: 'SignInController'
      })

      .otherwise({redirectTo: '/'});
      
    });
    
})();