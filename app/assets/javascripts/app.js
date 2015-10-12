var app = angular.module("myApp", ['ngRoute', 'ngCookies',  'templates', 'home',
                         'posts', 'Devise', 'auth' ]);


app.run(function($cookieStore, $rootScope) {
  $rootScope.isSignedIn = $cookieStore.get('loggedin');
})

app.config(function($routeProvider){

  $routeProvider
    .when('/home', {
      templateUrl: 'home/_home.html',
      controller: "MainCtrl"
    })
    .when('/login', {
      templateUrl: "auth/_login.html",
      controller: "AuthCtrl",
      onEnter: function($location, Auth) {
        Auth.currentUser().then(function(user) {
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
      controller: "PostCtrl"
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