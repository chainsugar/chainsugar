(function(){

angular.module('trApp')
    .controller('TasksController', ['$scope', 'TaskService', TasksController]);

  function TasksController($scope, TaskService){
    TaskService.retrieveUserTasks().success(function(tasks){
      $scope.tasks = tasks;
    });

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
