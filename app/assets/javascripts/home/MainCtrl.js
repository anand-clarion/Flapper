var home = angular.module('home', []);

home.controller('MainCtrl', function($scope, Auth, $rootScope){
  // Please Do not reassign current_user object in any parent controller
  $scope.current_user = {}
})