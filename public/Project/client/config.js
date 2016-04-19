"use strict";
(function(){
    angular
        .module("EventApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home",{
                    templateUrl:"views/home/home.view.html"
                })
                .when("/login",{
                    templateUrl:"views/login/login.view.html",
                    controller:"LoginController"
                })
                .when("/register",{
                    templateUrl:"views/register/register.view.html",
                    controller:"RegisterController"
                })
                .when("/profile",{
                    templateUrl:"views/profile/profile.view.html",
                    controller:"ProfileController"
                })
                .when("/forms",{
                    templateUrl:"client/views/forms/forms.view.html",
                    controller:"FormController"
                })
                .when("/create",{
                    templateUrl:"views/create/create.view.html"
                })
                .when("/search", {
                    templateUrl:"views/search/search.view.html"
                })
                .otherwise({
                    redirectTo:"/home"
                });


        });
})();
