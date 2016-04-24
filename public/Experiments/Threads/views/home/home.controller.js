"use strict";
(function (){
    angular
        .module("ThreaderApp")
        .controller("HomeController", HomeController);
    function HomeController($scope, $rootScope, PostService){
        //$scope.test= 'Hello World'
        $scope.posts = [
            'post 1',
            'post 2'
        ];
    }
})();

/*app.controller('MainCtrl',['$scope','posts',function($scope, posts){
    $scope.test= 'Hello World'
    $scope.posts = posts.posts;  */
    /*[
     {title: 'post 1', upvotes: 5},
     {title: 'post 2', upvotes: 2},
     {title: 'post 3', upvotes: 15},
     {title: 'post 4', upvotes: 9},
     {title: 'post 5', upvotes: 4}
     ]; */
    /* add POST controller */
 /*   $scope.addPost = function(){
        if(!$scope.title || $scope.title === '')
        {
            return;
        }
        $scope.posts.push({title: $scope.title, link:$scope.link, upvotes: 0,
            comments: [
                {author:'Grace', body:'Slick', upvotes: 0},
                {author:'Alice', body:'so and so', upvotes: 0}
            ]});
        $scope.title = '';
        $scope.link = '';
    };
    $scope.incrementUpvotes = function(post) {
        post.upvote(post);
    };
}]); */
