var auth = angular.module("auth", [])

auth.controller("AuthCtrl", function($scope, $rootScope, Auth, $location, $cookieStore) {

  $scope.user= {}
  $rootScope.isSignedIn = $cookieStore.get('loggedin');

  Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  $scope.refreshSession = function() {
    $rootScope.isSignedIn = $cookieStore.get('loggedin');
    Auth.currentUser().then(function (user){
      $scope.user = user;
    });
  }

  // User log In
  $scope.logIn = function() {
    Auth.login($scope.user).then(function(user) {
      $scope.user = user;
      $cookieStore.put('loggedin', true);
      $scope.refreshSession();
      $location.path('/posts')
    })
  }

  // New user Registration.
  $scope.register = function() {

    Auth.register($scope.user).then(function(user) {
      $scope.user = user;
      $cookieStore.put('loggedin', true);
      $scope.refreshSession();
      $location.path('/posts')
    })
  }

  $scope.logout = function() {
    Auth.logout().then(function() {
      $scope.user = {}
      $cookieStore.put('loggedin', false);
      $rootScope.isSignedIn = $cookieStore.get('loggedin');
      $location.path('/home')
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