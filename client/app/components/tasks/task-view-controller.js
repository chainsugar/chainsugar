(function(){

angular.module('trApp')
    .controller('TaskViewController', ['$scope', 'TaskFormService', TaskViewController]);

  function TaskViewController($scope, TaskFormService){
   // make calls to TaskFormService to retrieve all tasks
   // todo: get access to ID
  };

})();
