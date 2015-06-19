(function(){

angular.module('trApp', ['ngRoute'])
  .run(function ($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {

      if (next.$$route && !next.$$route.publicAccess){
        AuthService.check().then(function(loggedIn){
          if(!loggedIn) $location.path('/sign-in');
        });
      }

    });
  });

})();
