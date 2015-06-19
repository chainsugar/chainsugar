(function(){

  angular.module('trApp')
    .config(function($routeProvider) {

      $routeProvider
        .when('/', {
            templateUrl: 'app/components/landing/landing.html',
            controller: 'LandingPageController',
            publicAccess: true
        })
        .when('/sign-in', {
            templateUrl: 'app/components/log-in/log-in.html',
            controller: 'LoginPageController',
            publicAccess: true
        })
        .when('/create-task', {
            templateUrl: 'app/components/tasks/task-form.html',
            controller: 'TaskFormController'
        })
        .otherwise({redirectTo: '/'});

    });

})();
