(function(){

  angular.module('trApp')
    .factory('AuthService', ['$http', AuthService]);

  function AuthService($http){

    var loginStatus = {};

    loginStatus.check = function(){
      return $http({
        method: 'GET',
        url: '/auth/google/check'
      }).then(function(response){
        if(response.data) {
          console.log('User Is Logged In');
          return true;
        }
      }).catch(function(err){
        console.log('User Is Logged Out', err);
        return false;
      });
    }

    return loginStatus;
  }

})();
