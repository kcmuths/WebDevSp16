/*"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController)
    function HomeController($rootScope, $scope, $location ){
        $scope.signInUser = function(){
            return $rootScope.user;
        }
        $scope.enterFirstName = function(){
            if($rootScope.user)
                return $rootScope.user.firstName;
            return null;
        }
    }
})();
*/