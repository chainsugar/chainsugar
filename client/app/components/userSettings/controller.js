(function(){

  //load module
  angular.module('trApp')
    .controller('SettingsController', ['$scope', 'AuthService', SettingsController]);

  function SettingsController($scope, AuthService){
    AuthService.check().then(function(user){
      $scope.user = user;
    });

    $scope.save = function(){
      AuthService.update($scope.user).then(function(){
        $scope.statusMessage = "updated successfully.";
      }).catch(function(){
        $scope.statusMessage = "error saving settings!";
      });
    };
  };

})();
