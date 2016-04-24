"use strict";

(function(){
    angular
        .module("ThreaderApp")
        .config(function($routeProvider){
        $routeProvider
            .when("/posts",{
                url:'/posts/{id}',
                templateUrl:"../views/posts/posts.view.html",
                controller:"PostsController"
            })
            .when("/login",{
                templateUrl:"./views/login/login.view.html",
                controller:"LoginController"
            })
            .when("/register",{
                templateUrl:"./views/register/register.view.html"
            })
            .when("/profile",{
                templateUrl:"./views/profile/profile.view.html"
            })
            .when("/home",{
                templateUrl:"./views/home/home.view.html",
                controller:"HomeController"
            })
            .otherwise({
                redirectTo:"#/home"
            });


    });
})();
