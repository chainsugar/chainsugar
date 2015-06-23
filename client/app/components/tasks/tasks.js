(function(){

angular.module('trApp')
    .controller('TasksController', ['$scope', '$location', 'TaskService', TasksController]);

  function TasksController($scope, $location, TaskService){
    // make calls to TaskFormService to retrieve all tasks

    TaskService.retrieveUserTasks().success(function(tasks){
      $scope.tasks = tasks;
    });

    $scope.viewTask = function(id) {
      $location.path('/task/' + id);
    }

  };

})();

// $scope.tasks = [{
   //   owner: 'Bryan',
   //   information: {
   //     cost: '10',
   //     name: 'Walk The Dog',
   //     city: 'San Francisco',
   //     description: 'Easy Money'
   //   },
   //   applicants:[]
   // }];
