"use strict";
(function(){
    angular
        .module("EventApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService){
        $scope.error = null;
        $scope.message = null;

        $scope.currentUser = UserService.getCurrentUser();
        if(!$scope.currentUser){
            $location.url("/home");
        }
        $scope.updateUser = updateUser;

        function updateUser(user){
            $scope.error = null;
            $scope.message = null;
            $scope.currentUser = UserService.updateUser(user);

            if(user){
                $scope.message = "User updated successfully";
                UserService.setCurrentUser($scope.currentUser);
            }
            else {
                $scope.message = "Unable to update user";
            }
        }
    }
})();

