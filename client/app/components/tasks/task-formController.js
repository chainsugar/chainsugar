(function(){

  //load module
  angular.module('trApp')
    .controller('TaskFormController', ['$scope', '$http', '$location', 'TaskFormService', TaskFormController]);

  function TaskFormController($scope, $http, $location, TaskFormService){
    $scope.form = {};

    // http POST on form submit
    $scope.createTask = function(){
      TaskFormService.addTask($scope.form);
    };

    $scope.redirectCall = function() {
      $location.path('/task-view');
    };
  };

})();
