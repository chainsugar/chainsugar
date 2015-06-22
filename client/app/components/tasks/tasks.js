(function(){

angular.module('trApp')
    .controller('TasksController', ['$scope', 'TaskFormService', TasksController]);

  function TasksController($scope, TaskFormService){
   // make calls to TaskFormService to retrieve all tasks
   
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
