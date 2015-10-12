post.factory("PostData", function($http) {

  var posts = $http.get('/posts.json').success(function(data) {

  })
  return posts;

})