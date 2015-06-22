// login page controller here

(function(){

//load module
angular.module('trApp')
  .controller('LoginPageController', ['$scope', '$location', AuthService]);
  
function LoginPageController(){
  }

})();
  // insert auth service here as a dependency