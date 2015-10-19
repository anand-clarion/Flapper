var auth = angular.module("auth", [])

auth.controller("AuthCtrl", function($scope, $rootScope, Auth, $location, $cookieStore, Flash) {

  Flash.dismiss();

  $scope.user ={}

  // Initilize current user
  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  // User log In
  $scope.logIn = function() {
    Auth.login($scope.user).then(function(user) {
      $rootScope.isSignedIn = true
      $location.path('/posts')
      message = "Welcome <b> " + user.name + " </b>You Have Successfully Logged in"
      Flash.create('success', message);
    }, function(error){
      Flash.create('danger', error.data.error);
    })
  }

  // New user Registration.
  $scope.register = function() {
    Auth.register($scope.user).then(function(user) {
      $rootScope.isSignedIn = true
      $location.path('/posts')
      message = "Welcome <b>" + user.name + "</b>"
      Flash.create('success', message);
    })
  }

  $scope.logout = function() {
    Auth.logout().then(function(previous_user) {
      $rootScope.isSignedIn = false
      $location.path('/home')
      message = "Hey <b>" + previous_user.name + " </b> You Have Been Logged Out"
      Flash.create('success', message);

    })
  }

  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
  });

})

// Custom validation to match Password Confirmation
auth.directive("passwordVerify", function() {
  return {
    require: 'ngModel',

    link: function(scope, element, attr, ctrl) {
      ctrl.$validators.passwordVerify = function(modleValue, viewValue) {

        if(scope.user.password === modleValue) {
          return true;
        }

        return false;
      }
    }
  }
})