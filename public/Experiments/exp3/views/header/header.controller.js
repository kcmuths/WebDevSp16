"use strict";
(function(){
    angular
        .module("EventApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope, $location, UserService){
        $scope.$location = $location;
        $scope.logOut = logOut;
        function logOut(){
            UserService.setCurrentUser(null);
            $location.url("/home");

        }
    }
})();

