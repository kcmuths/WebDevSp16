var app = angular.module('Threads', ['ui.router']);
app.factory('posts',[ function(){
    var o = {
        posts:[]
    };
    return o;

}]);





app.controller('MainCtrl',['$scope','posts', function($scope, posts){
    //$scope.test= 'Hello World'
    $scope.posts = posts.posts;
    //$scope.isLoggedIn = auth.isLoggedIn;

    //$scope.title = '';
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
        /*  posts.create({
         title:$scope.title,
         link:$scope.link,
         });

         */
        $scope.posts.push({title: $scope.title, link:$scope.link, upvotes: 0,
            comments: [
                {author:'Grace Slick', body:'Thats a Great Post!!', upvotes: 0},
                {author:'John Bonham', body:'Awesome Stuff', upvotes: 0}
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
/*                resolve:{                                           //Query all posts from our Backend
                    postPromise:['posts', function(posts){
                        return posts.getAll();
                    }]
                } */
            })
            .state('posts', {
            url: '/posts/{id}',
            templateUrl:'/posts.html',
            controller: 'PostsCtrl'
               /*resolve: {
                    post: ['$stateParams', 'posts', function($stateParams, posts){
                        return posts.get($stateParams.id);
                    }]
                } */
        })
            .state('profile', {
            url: '/profile',
            templateUrl: '/profile.html',
            controller: 'ProfileCtrl'
        })
            .state('login', {
                url: '/login',
                templateUrl: '/login.html',
                controller: 'LoginCtrl'

            })

            .state('register', {
                url: '/register',
               templateUrl: '/register.html',
           //     controller: 'AuthCtrl',

            });


        $urlRouterProvider.otherwise('home');
    }
]);

/*
app.factory('auth', ['$http', '$window',
    function($http, $window){
        var auth = {};


        auth.saveToken = function(token){
            $window.localStorage['Threader-news-token']= token;
        };
        auth.getToken = function(){
            return $window.localStorage['Threader-news-token'];

        }
        auth.isLoggedIn = function(){
            var token = auth.getToken();
            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now()/1000;
            }
            else
            {
                return false;
            }
        };
        auth.currentUser = function(){
            if(auth.isLoggedIn()){
                var token = auth.getToken();
                var payload =JSON.parse($window.atob(token.split('.')[1]));
                return payload.username;
            }
        };

        return auth;
    }]);


*/


    /* Retrieve All posts

    o.getAll = function(){
        return $http.get('/api/Project/Threads/posts').success(function(data){
            angular.copy(data, o.posts);
        });
    };

    */

    /* Creating New Posts
    o.create = function(post){
        return $http.post('/api/Project/Threads/posts', post, {
        headers: {Authorization: 'Bearer ' +auth.getToken()}
        })
        .success(function(data){
            o.posts.push(data);
        });
    };
*/
    /* Main Page upvotes
    o.upvote = function(post){
        return $http.put('/api/Project/Threads/posts/' + post._id + '/upvote', null,{
            headers: {Authorization: 'Bearer '+auth.getToken()}
        })
            .success(function(data){
                post.upvotes +=1;
            });
    }; */

    /*Retrieve Single post from server
    o.get = function(id){
        return $http.get('/api/Project/Threads/posts/' + id).then(function(res){
            return res.data;
        });
    };


*/
    /* Enable adding comments
    o.addComment = function(id, comment){
        return $http.post('/api/Project/Threads/posts' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer ' +auth.getToken()}
        });
    };

    */
/*
    o.upvoteComment = function(post, comment){
        return $http.put('/api/Project/Threads/posts/' + post._id + '/comments/' + comment._id + '/upvote', null,{
            headers: {Authorization: 'Bearer '+auth.getToken()}
        })
            .success(function(data){
                comment.upvotes +=1;
            });
    };
    */




/* POST controller */
app.controller('PostsCtrl', ['$scope', '$stateParams','posts', function($scope, $stateParams, posts){

        $scope.post = posts.posts[$stateParams.id];
        //$scope.isLoggedIn = auth.isLoggedIn;

        $scope.addComment = function(){
        if($scope.body === ''){
            return;
        }
        /*
            posts.addComment(post._id, {
            body: $scope.body,
            author: 'user'
        })
            .success(function(comment){
            $scope.post.comments.push(comment);
        });
        $scope.body = '';
*/




        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
        });
        $scope.body = '';
    };

    $scope.incrementUpvotes = function(comment){
        posts.upvoteComment(post, comment);
    };

    }]);


/* Controller for LOGIN and Register Page

app.controller('AuthCtrl', ['$scope', '$state', 'auth',
    function($scope, $state, auth){
        $scope.user = {};

        $scope.register = function(){
            auth.register($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };

        $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };
    }]);
/
/* NAVIGATION/HEADER Controller

app.controller('NavCtrl', ['$scope', 'auth',
    function($scope, auth){
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
    }]);

*/

/* LOGIN CONTROLLER */

(function(){
    angular
        .module("Threads")
        .controller("LoginCtrl", LoginCtrl);
    function LoginCtrl($rootScope, $scope, $location, UserService) {
        $scope.$location = $location;
        $scope.login = login;

        function login(user){
            var user = UserService.findUserByCredentials(user, function (user){
                if(user){
                    $rootScope.currentUser = user;
                    UserService.setCurrentUser(user);
                    $location.url('/profile');
                }
            });
        }
    }
})();


/*Profile Controller */

(function(){
    angular
        .module("Threads")
        .controller("ProfileCtrl", ProfileCtrl);
    function ProfileCtrl($rootScope, $scope, $location, UserService){
        $scope.error = null;
        $scope.message = null;
        $scope.currentUser = UserService.getCurrentUser();
        if(!$scope.currentUser){
            $location.url("/home");
        }
        $scope.updateUser = updateUser;

        function updateUser(user){
            $scope.error = null;
            $scope.messgae = null;
            $scope.currentUser = UserService.updateUser(user);
            if(user){
                $scope.message = "USer created";
                UserService.setCurrentUser($scope.currentUser);
            }
            else {
                $scpe.message = "Unable to update";
            }
        }
    }
})();

/* REGISTER CONTROLLER */

(function(){
    angular
        .module("Threads")
        .controller("RegisterCtrl", RegisterCtrl);
    function RegisterCtrl($rootScope, $scope, $location, UserService){
        $scope.register = register;
        $scope.messgae = null;

        function register(user){
            $scope.message = null;
            if(user == null){
                $scope.message = "Please Fill fields";
                return;
            }
            if(!user.username){
                $scope.message = "Please provide username";
                return;
            }
            if(!user.password || !user.password2){
                $scope.message = "Please provide password";
                return;
            }
            if(user.password != user.password2){
                $scope.message = "passwords should match";
                return;
            }
            var tmpUser;
            var callback = function(user){
                tmpUser = user;
            };

            UserService.findUserByCredentials(user.username, user.password, callback);
            if(tmpUser != null){
                $scope.message = "User exists";
            }
            else {
                UserService.createUser($scope.user, callback);
                UserService.setCurrentUser(tmpUser);
                $location.url("/profile");
            }

        }
    }
})();


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

    function timeSince(date) {
        var seconds = Math.floor(((new Date().getTime() / 1000) - date))
        var interval = Math.floor(seconds / 31536000);

        if (interval >= 1) {
            if (interval == 1)
                return interval + " year ago";
            else
                return interval + "years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            if (interval == 1)
                return interval + "month ago";
            else
                return interval + "months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1)
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
