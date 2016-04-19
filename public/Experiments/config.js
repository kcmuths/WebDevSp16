
(function(){
    angular.module("EventApp")
    angular.config(function($routeProvider){
        $routeProvider
            .when("/admin",{
                templateUrl:"./views/admin/admin.view.html"
            })
            .when("/login",{
                templateUrl:"./views/users/login.view.html"
            })
            .when("/register",{
                templateUrl:"./views/users/register.view.html"
            })
            .when("/profile",{
                templateUrl:"./views/profile/profile.view.html"
            })
            .when("/forms",{
                templateUrl:"./views/admin/admin.view.html"
            })
            .otherwise({
                redirectTo:"/home"
            });


    });
})();
