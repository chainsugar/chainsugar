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
        }).success(function(response){
          console.log("created new task:", response.data);
          return response.data;
        }).error(function(err){
          console.log(err);
        });
      }
    };
  }

})();
