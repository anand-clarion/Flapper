var user = angular.module("users",[]);

user.controller("UserDetailCtrl", function($scope, Auth, Upload, Flash, $http, $state,$stateParams){

  $http.get("/users/"+ $stateParams.id + ".json").success(function(user){
    $scope.user = user
    $scope.user.isEdit = true;
  })

   // Update user info
  $scope.register = function() {
    Upload.upload({
      url: '/users.json',
      method: 'PUT',
      data: { user: $scope.user},
    }).then(function (resp) {
      $state.go('^',{},{ reload: true, inherit: true, notify: true});
      $scope.current_user.info  = resp.config.data.user;
      message = "Profile successfully Updated"
      Flash.create('success', message);
    })
  }
})