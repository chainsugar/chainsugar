(function(){

  angular.module('trApp')
    .factory('AuthService', ['$http', AuthService]);

  function AuthService($http){

    var profile = {};

    profile.check = function(){
      return $http({
        method: 'GET',
        url: '/auth/google/check'
      }).then(function(response){
        return response.data;
      }).catch(function(){
        return null;
      });
    };

    profile.update = function(user){
      return $http({
        method: 'POST',
        url: '/auth/profile/update',
        data: user
      });
    }

    return profile;
  }

})();
