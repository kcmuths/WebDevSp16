"use strict";
(function(){
    angular
        .module("EventApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        $scope.register = register;
        $scope.message = null;

        function register(user) {
            $scope.message = null;
            if (user == null) {
                $scope.message = " Please fill all fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide an username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords should match";
                return;
            }
            var tmpUser;
            var callback = function (user) {
                tmpUser = user;
            }
            UserService.findUserByCredentials(user.username, user.password, callback);
            if (tmpUser != null) {
                $scope.message = "User Already exists";
                return;
            }
            else {
                UserService.createUser($scope.user, callback);
                UserService.setCurrentUser(tmpUser);
                $location.url("/home");
            }
        }
    }

})();
