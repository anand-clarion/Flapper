var user = angular.module("users",[]);

user.controller("UserDetailCtrl", function($scope, Auth, $http, $routeParams){
  $http.get("/users/"+ $routeParams.id + ".json").success(function(user){
    $scope.user = user
  })
})