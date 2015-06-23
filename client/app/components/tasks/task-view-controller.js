(function(){

angular.module('trApp')
    .controller('TaskViewController', ['$scope', '$location', '$routeParams', 'TaskService', TaskViewController]);

  function TaskViewController($scope, $location, $routeParams, TaskService){

    // get task _id from $rootParams
    var _id = $routeParams.id;

    // reload task information from server
    var reload = function(){
      TaskService.retrieveTask(_id).success(function(task){
        $scope.task = task;
        // date is a pesky thing to deal with
        // must be always be a Date object for the model per angular's doc
        $scope.deadline = new Date( $scope.task.information.deadline );
      });
    };

    $scope.updateTask = function() {
      $scope.task.information.deadline = $scope.deadline;
      TaskService.updateTask(_id, $scope.task.information).success(function(){
        reload();
      }).catch(function(err){
        //display error message, maybe  $scope.errorMessage = "error" ?
        console.log(err);
      });
    };

    $scope.deleteTask = function() {
      TaskService.deleteTask(_id).success(function(){
        $location.path("/tasks");
      });
      //todo handle error
    };

    $scope.applyForTask = function(){
      TaskService.applyForTask(_id).success(function(){
        $location.path('/tasks');
      });
      //todo handle error
    };

    $scope.assignToUser = function(userId){
      userId = $scope.task.owner;//just for testing

      TaskService.assignTask(_id, userId).success(function(){

      }).catch(function(err){

      })
    };

    $scope.taskComplete = function(){
      TaskService.setTaskComplete(_id);
    };

    reload(_id);
  };

})();

