(function(){

  angular.module('trApp')
    .factory('AuthService', ['$http', AuthService]);

  function AuthService($http){
    var loginStatus = {
      loggedIn: false
    };

    $http({
      method: 'GET',
      url: '/auth/google/check'
    }).then(function(response){
      if(response.data) {
        console.log('User Is Logged In');
        loginStatus.loggedIn = true;
      }
    }).catch(function(err){
      console.log('User Is Logged Out', err);
      loginStatus.loggedIn = false;
    });

    return loginStatus;
  }

})();
