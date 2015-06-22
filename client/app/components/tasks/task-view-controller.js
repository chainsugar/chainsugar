(function(){

angular.module('trApp')
    .controller('TaskViewController', ['$scope', 'TaskService', TaskViewController]);

  function TaskViewController($scope, TaskService){
   // make calls to TaskFormService to retrieve all tasks
   // todo: get access to ID
  };

})();
