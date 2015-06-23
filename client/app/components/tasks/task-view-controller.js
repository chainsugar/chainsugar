(function(){

angular.module('trApp')
    .controller('TaskViewController', ['$scope', '$location', 'TaskService', TaskViewController]);

  function TaskViewController($scope, $location, TaskService){
 
    // get task _id from url 
    // >> $location.path('/task/' + task._id)
    var _id = $location.path().substring(6);
    TaskService.retrieveOneTask(_id).success(function(task){
      $scope.task = task;  
      // date is a pesky thing to deal with
      // must be always be a Date object for the model per angular's doc
      $scope.deadline = new Date( $scope.task.information.deadline );
    });

    $scope.updateTask = function() {
      $scope.task.information.deadline = $scope.deadline;
      $scope.task = TaskService.updateTask(_id);
    };
    $scope.deleteTask = function() {
      TaskService.deleteTask(_id);
    };

  };

})();

