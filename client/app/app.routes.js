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
            templateUrl: 'app/components/sign-in/sign-in.html',
            controller: 'LoginPageController',
            publicAccess: true
        })
        .when('/create-task', {
            templateUrl: 'app/components/tasks/task-form.html',
            controller: 'TaskFormController'
        })
        .when('/tasks', {
            templateUrl: 'app/components/tasks/tasks.html',
            controller: 'TaskFormController'
        })
        .when('/task/:id', {
            templateUrl: 'app/components/tasks/task-view.html',
            controller: 'TaskViewController'
        })
        .otherwise({redirectTo: '/'});

    });

})();
