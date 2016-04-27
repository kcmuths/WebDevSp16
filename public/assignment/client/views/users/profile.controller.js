"use strict";
(function(){
    angular
        .module("Threads")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService, $rootScope){
        $scope.$location = $location;
        $scope.user = $rootScope.currentUser;

        $scope.update = function() {
            UserService.updateUser($scope.user.id, $scope.user, function(user)
            {
                for(var i in user)
                {
                    $scope.user[i] = user[i];
                }
            });
        }
    }
})();


