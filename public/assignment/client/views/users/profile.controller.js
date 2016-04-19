"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService, $rootScope){
        $scope.$location = $location;
        $scope.user = $rootscope.currentUser;

        $scope.update = function() {
            UserService.updateUser($scope.user.id, $scope.user).then (function(user)
            {
                for(var i in user)
                {
                    $scope.user[i] = user[i];
                }
            });
        }
    }
})();


