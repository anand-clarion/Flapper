var post = angular.module("posts", [])

post.controller("PostCtrl", function($scope, PostData, $http, $stateParams, $location, Flash, Auth) {

  Flash.dismiss();

  // Initilize current user
    Auth.currentUser().then(function(user) {
      $scope.current_user = user
    })

  $scope.post = {}

  // Get All Posts
  $http.get('/posts.json').success(function(data) {
    $scope.posts_list = data
  })

  // Add a new Post
  $scope.addPost = function() {
    if($scope.post.title) {
      $http.post("/posts.json", {post: $scope.post}).success(function(data){
        $scope.posts_list = data
        $scope.post.title = ''
        $scope.post.content = ''
        $scope.post_form.$setPristine();
        $scope.post_form.$setUntouched();
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
      Flash.create("success", "Post Successfully Deleted")
    })
  }
});

post.controller('PostDetailCtrl', function($scope, $stateParams, $http, $location, Flash) {
  $scope.comment = {}
  $scope.comment_list = {}

  $http.get('/posts/' + $stateParams.id + '.json').success(function(data) {
    $scope.post = data
  })

  // Update the likes of post and comment.
  $scope.updateLikes = function(likable) {
    $http.post('/likes.json', {like: {likable_type: $scope.likable_type, likable_id: likable.id}}).success(function(like) {
      likable.likes.length += 1;
      Flash.create("success", "Your Vote Successfully Added")
    })
  }

  // Add comment on post
  $scope.addComment = function(post) {
    $http.post('/posts/'+post.id+'/comments.json', { comment: $scope.comment }).success(function(data) {
      $scope.post = data
      $scope.comment.content = ''
      Flash.create("success", "Comment Successfully Added")
      $scope.comment_form.$setPristine();
      $scope.comment_form.$setUntouched();
    })
  }

  $scope.deleteComment = function(post, comment) {
    var index = $scope.post.comments.indexOf(comment);
    $http.delete('/posts/'+post.id+'/comments/'+comment.id+'.json').success(function(data){
      $scope.post.comments.splice(index, 1);
      $location.path('/posts/'+post.id);
      Flash.create("success", "Comment Successfully Deleted")
    })
  }
})
