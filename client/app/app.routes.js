(function(){

    angular.module('trApp')
    
    .config(function($routeProvider) {
    
      $routeProvider.when('/', {
          templateUrl: 'app/components/landing/landing.html',
          controller: 'LandingPageController'
      })
      .otherwise({redirectTo: '/'});
      
    });
    
})();