var app = angular.module('Threads', ['ui.router']);
app.factory('posts',[function(){
    var o = {
        posts:[]
    };
    return o;
}]);
app.controller('MainCtrl',['$scope','posts',function($scope, posts){
    $scope.test= 'Hello World'
    $scope.posts = posts.posts;
        /*[
        {title: 'post 1', upvotes: 5},
        {title: 'post 2', upvotes: 2},
        {title: 'post 3', upvotes: 15},
        {title: 'post 4', upvotes: 9},
        {title: 'post 5', upvotes: 4}
    ]; */
    /* add POST controller */
    $scope.addPost = function(){
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
        post.upvotes += 1;
    };
}]);

app.config([
    '$stateProvider',
    '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('posts', {
            url: '/posts/{id}',
            templateUrl:'/posts.html',
            controller: 'PostsCtrl'
        })
            .state('search', {
            url: '/search',
            templateUrl: '/search.html',
            controller: 'SearchCtrl'
        })
            .state('header',{
                url: '/header',
                templateUrl: '/header.html',
                controller: 'HeaderCtrl'
            })
            .state('login',{
                url:'/login',
                templateUrl:'login.html',
                controller:'LoginCtrl'
            });
        $urlRouterProvider.otherwise('home');
    }
]);
/* POST controller */
app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function(){
        if($scope.body === ''){
            return;
        }
        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
        });
        $scope.body = '';
    };

    }]);

/* SEARCH REDDIT API */

$(function(){
    $('#domainform').on('submit', function(event){
        event.preventDefault();

        var domain = $('#s').val();
        var newdomain = domain.replace(/\//g, ''); //getting rid of slashes
        var requrl = "http://www.reddit.com/domain/";
        var fullurl = requrl + domain + ".json";

        $.getJSON(fullurl, function(json){
            var listing = json.data.children;
            var html = '<ul class="linklist">\n';

            for (var i= 0, l=listing.length; i<l; i++) {
                var obj = listing[i].data;
                var votes = obj.score;
                var title = obj.title;
                var subtime = obj.created_utc;
                var thumb = obj.thumbnail;
                var subrdt = "/r/" + obj.subreddit;
                var redditurl = "http://www.reddit.com" + obj.permalink;
                var subrdturl = "http://www.reddit.com/r/" + obj.subreddit + "/";
                var exturl = obj.url;
                var timeago = timeSince(subtime);
                if (obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '')
                    thumb = '../img/redditimg.png'; //yet to be added

                html += '<li class="clearfix">\n';
                html += '<img src="' + thumb + '" class="thumbimg">\n';
                html += '<div class="linkdetails"><h2>' + title + '</h2>\n';
                html += '<p class="subrdt">posted to <a href="' + subrdturl + '" target="_blank">' + subrdt + '</a>' + timeago + '</p>';
                html += '<p><a href="' + exturl + '" class="blubtn" target="_blank">visit link</a> - <a href="' + redditurl + '" class="blubtn" target="_blank">view on reddit</a></p>';
                html += '</div></li>\n';
            }
            htmlOutput(html);
        }); //getJSON()
    }); //.on(submit) listener
    function htmlOutput(html){
        html += '</ul>';

        $('#content').html(html);
    }
    $('#res').click(function(){
        $("#s").attr({
            value:'',
            placeholder: 'ex:google.com'
        });
        $("#content").replaceWith('<div id="content"></div>');
    });

    //timeago references timeSince. Used to display imestamp in the format xx minutes ago.

    function timeSince(date){
        var seconds = Math.floor(((new Date().getTime()/1000) - date))
        var interval = Math.floor(seconds / 31536000);

        if(interval >= 1){
            if(interval == 1)
            return interval + " year ago";
            else
            return interval + "years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if(interval >= 1 ){
            if(interval == 1)
            return interval + "month ago";
            else
            return interval + "months ago";
        }
        interval = Math.floor(seconds/86400);
        if(interval >= 1)
            return interval + "day ago";
            else
            return interval + "days ago";
        interval = Math.floor(seconds/3600);
        if(interval >= 1)
        return interval + "hour ago";
        else
        return interval + "hours ago";

        interval = Math.floor(seconds/60);
        if(interval >= 1)
        return interval + "minute ago";
        else
        return interval + "minutes ago";
    }
});
