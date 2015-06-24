(function(){

angular.module('trApp', ['ngRoute'])
  .run(function ($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {

      //ignore arriving at root path
      if (next.$$route.originalPath === "") {
        return;
      }

      if (next.$$route && !next.$$route.publicAccess){
        AuthService.check().then(function(loggedIn){
          if(!loggedIn) $location.path('/sign-in');
        });
      }

    });
  });

})();
