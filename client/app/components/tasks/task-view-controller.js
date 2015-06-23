(function(){

angular.module('trApp')
    .controller('TaskViewController', ['$scope', '$location', 'TaskService', TaskViewController]);

  function TaskViewController($scope, $location, TaskService){
    // todo: get access to ID
 
    // where to get task _id?
    // from url 
    // >> $location.path('/task/' + task._id)
 
    var _id = $location.path().substring(6);
    
    $scope.task = TaskService.retrieveUserTask(_id);

    $scope.updateTask = function() {
      $scope.task = TaskService.updateTask(_id);
    };
    $scope.deleteTask = function() {
      TaskService.deleteTask(_id);
    };

  };

})();

// example task object
// {
//   "_id":"558899fd55b268366d406fe6",
//   "owner":"55846036278a894cfe761092",
//   "information":{
//     "name":"wash dishes",
//     "cost":10,
//     "deadline":"1212-12-11T16:00:00.000Z",
//     "city":"san fran",
//     "description":"get some money."
//   },
//   "assignedTo":"",
//   "__v":0,
//   "applicants":[]
// }
