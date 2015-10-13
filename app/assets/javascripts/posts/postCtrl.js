var post = angular.module("posts", [])

post.controller("PostCtrl", function($scope, PostData, $http, $routeParams, $location, Flash) {

  Flash.dismiss();

  $scope.post = {}

  // Get All Posts
  $http.get('/posts.json').success(function(data) {
      $scope.posts_list = data
  })

  //  Add a new Post
  $scope.addPost = function() {
    if($scope.post.title) {
      $http.post("/posts.json", {post: $scope.post}).success(function(data){
        $scope.posts_list.push(data);
        $scope.post.title = ''
        $scope.post.content = ''
        Flash.create("success", "Post Successfully Created")
      })
    }
  }

  // Delete post
  $scope.deletePost = function(post) {
    var index = $scope.posts_list.indexOf(post);
    $http.delete('/posts/'+post.id+'.json').success(function(data) {
      $scope.posts_list.splice(index, 1);
      $location.path('/posts')
      Flash.create("info", "Post Successfully Deleted")
    })
  }
});

post.controller('PostDetailCtrl', function($scope, $routeParams, $http, $location, Flash) {
  $scope.comment = {}
  $scope.comment_list = {}

  $http.get('/posts/' + $routeParams.id + '.json').success(function(post) {
    $scope.post = post[0]
    $scope.comment_list = post[1];
  })

  // Update the likes of post
  $scope.updatePostLikes = function(post) {
    $http.get("/posts/" + post.id + '/addvote.json').success(function(data) {
      post.likes +=1;
      Flash.create("success", "Your Vote Successfully Added")
    })
  }

  // Add comment on post
  $scope.addComment = function(post) {
    $http.post('/posts/'+post.id+'/comments.json', { comment: $scope.comment }).success(function(data) {
      $scope.comment_list.push(data);
      $scope.comment.content = ''
      Flash.create("success", "Comment Successfully Added")
    })
  }

  // Update the likes of comments
  $scope.updateCommentLike = function(post, comment) {
    $http.get('/posts/'+post.id+'/comments/'+comment.id+'/addvote.json').success(function(data){
      comment.likes += 1
      Flash.create("success", "Your Vote Successfully Added")
    })
  }

  $scope.deleteComment = function(post, comment) {
    var index = $scope.comment_list.indexOf(comment);
    $http.delete('/posts/'+post.id+'/comments/'+comment.id+'.json').success(function(data){
      $scope.comment_list.splice(index, 1);
      $location.path('/posts/'+post.id);
      Flash.create("success", "Comment Successfully Deleted")
    })
  }
})
