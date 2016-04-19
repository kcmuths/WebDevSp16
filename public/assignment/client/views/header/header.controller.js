"use strict";
(function(){
    angular
        .module("FormBuilderApp")
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

