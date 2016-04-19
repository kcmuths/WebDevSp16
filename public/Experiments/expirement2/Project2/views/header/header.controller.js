"use strict";
(function(){
    angular
        .module("app")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope, $location, UserService){
        $scope.$location = $location;
        //$scope.logOut = logOut;
        //function logOut(){
          //  UserService.setCurrentUser(null);
           // $location.url("/admin");

        //}
    }
})();
