var app = angular.module("myApp", ['ui.router', 'ngCookies',  'templates', 'home',
                         'posts', 'Devise', 'auth', 'ngMessages', "flash",
                         'users', 'ngFileUpload'
                         ]);


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
app.run(function($cookieStore, $rootScope, Auth, $location) {

  Auth.currentUser().then(function(user) {
      $rootScope.isSignedIn = true
    }, function(error) {
      $rootScope.isSignedIn = false
  });
})

// Define routes and app configuration.
app.config(function( $stateProvider, $urlRouterProvider, $httpProvider){

  $httpProvider.interceptors.push('authHttpResponseInterceptor');
   $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: "MainCtrl"
    })
    .state('login', {
      url: '/login',
      templateUrl: "auth/_login.html",
      controller: "AuthCtrl",
      resolve: {
        "redirectLoggedInUser": function(checkUser) {
          return checkUser.isLoggedIn()
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: "auth/_user_form.html",
      controller: "AuthCtrl",
      resolve: {
        "redirectLoggedInUser": function(checkUser) {
          return checkUser.isLoggedIn()
        }
      }
    })
    .state('posts', {
      url: '/posts',
      templateUrl: "posts/_post_list.html",
      controller: "PostCtrl"
    })
    .state('posts_detail', {
      url: '/posts/:id',
      templateUrl: "posts/_post_show.html",
      controller: "PostDetailCtrl"
    })
    .state('posts.id.edit', {
      url: '/edit',
      templateUrl: "posts/_post_show.html",
      controller: "PostEditCtrl"
    })
    .state("users", {
      url: '/users'
    })
    .state("user_detail", {
      url: '/users/:id',
      templateUrl: "users/_user_show.html",
      controller: "UserDetailCtrl"
    })
    .state("user_detail.edit", {
      url: '/edit',
      templateUrl: "auth/_user_form.html",
      controller: "UserDetailCtrl"
    })
    $urlRouterProvider.otherwise("/home");
  })

// Redirect Logged in user to index page
app.factory("checkUser", function(Auth, $location){
  return {
    isLoggedIn: function() {
      Auth.currentUser().then(function(){
        $location.path('/posts')
      })
    }
  }
})

