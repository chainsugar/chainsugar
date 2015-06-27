(function(){

  //load module
  angular.module('trApp')
    .controller('SettingsController', ['$scope', 'AuthService', SettingsController]);

  function SettingsController($scope, AuthService){
    $scope.user = {};

    AuthService.check().then(function(response){
      $scope.user = response.data;
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
