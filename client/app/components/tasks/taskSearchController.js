(function(){

angular.module('trApp')
    .controller('TaskSearchController', ['$scope', '$location', 'TaskService', TaskSearchController]);

  function TaskSearchController($scope, $location, TaskService){
    // make calls to TaskFormService to retrieve all tasks

    TaskService.retrieveAllTasks().success(function(tasks){
      $scope.tasks = _.map(tasks, function(task){
        task.information.deadline = moment(Date(task.information.deadline)).format('MMMM Do YYYY');
        return task;
      });
    });

    $scope.viewTask = function(id) {
      $location.path('/task/' + id);
    }

  };

})();
