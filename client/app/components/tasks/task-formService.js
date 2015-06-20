(function(){

  //load module
  angular.module('trApp')
    .factory('TaskFormService', ['$http', TaskFormService]);

  function TaskFormService($http){
    return {
      addTask: function(form) {
        return $http({
          method: 'POST',
          url: '/api/tasks',
          data: form
        }).success(function(task){
          return task;
        }).error(function(err){
          console.log(err);
        });
      }
    };
  }

})();
