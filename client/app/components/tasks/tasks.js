 angular.module('trApp')
    .controller('TasksController', ['$scope', 'TaskFormService', TasksController]);

  function TasksController($scope, TaskFormService){
   // make calls to TaskFormService to retrieve all tasks
  };

})();
