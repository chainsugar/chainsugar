(function(){

  //load module
  angular.module('trApp')
    .factory('LandingService', ['$http', TaskFormService]);
      
  function TaskFormService($http)  
    return {
      addTask: function(form) {
        return $http({
          method: 'POST',
          url: 'http://example.com/api/mokhtar',
          // headers: {
          // 'Content-Type': undefined
          // },
          data: form
        }).success(function(response){
          return response.data;
        }).error(function(err){
          console.log(err);
        });
      }
    }
  }

})();