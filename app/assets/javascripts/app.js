var app = angular.module("myApp", ['ngRoute', 'ngCookies',  'templates', 'home',
                         'posts', 'Devise', 'auth', 'ngMessages', "flash"]);


// To Handle the unauthorized 401 Error.
app.factory('authHttpResponseInterceptor',function($q,$location, Flash){
  return {

    response: function(response){
      if (response.status === 401) {
          console.log("Response 401");
      }
      return response || $q.when(response);
    },
    responseError: function(rejection) {
      // generate rails generated errors mesages.
      var msg = ''
      angular.forEach(rejection.data.errors, function(value, key) {
        msg += key + " - " + value + '<br>'
      });
      if(msg) {
        Flash.create("danger", msg);
      }

      if (rejection.status === 401) {
        if($location.path() == "/register" || $location.path() == "/login" ) {

        }
        else {
          $location.path('/login')
          Flash.create('danger', rejection.data.error);
        }
      }
      return $q.reject(rejection);
    }
  }
})

// Re initialized session on page refresh
app.run(function($cookieStore, $rootScope, Auth) {
  Auth.currentUser().then(function(user) {
      $rootScope.isSignedIn = true
    }, function(error) {
      $rootScope.isSignedIn = false
  });
  $rootScope.errors = [];
})

// Define routes and app configuration.
app.config(function($routeProvider, $httpProvider){

  $httpProvider.interceptors.push('authHttpResponseInterceptor');
  $routeProvider
    .when('/home', {
      templateUrl: 'home/_home.html',
      controller: "MainCtrl"
    })
    .when('/login', {
      templateUrl: "auth/_login.html",
      controller: "AuthCtrl",
      onEnter: function($location, Auth) {
        Auth.currentUser().then(function() {
          $location.path('/posts')
        })
      }
    })
    .when('/register', {
      templateUrl: "auth/_register.html",
      controller: "AuthCtrl"
    })
    .when('/posts', {
      templateUrl: "posts/_post_list.html",
      controller: "PostCtrl",
      onEnter: function($location, Auth) {
        Auth.currentUser().then(function() {
          $location.path('/posts')
        })
      }
    })
    .when('/posts/:id', {
      templateUrl: "posts/_post_show.html",
      controller: "PostDetailCtrl"
    })
    .when('/posts/:id/edit', {
      templateUrl: "posts/_post_show.html",
      controller: "PostEditCtrl"
    })
    .otherwise({
      redirectTo:"/home"
    })
})