"use strict";
(function() {
    angular
        .module("EventApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        $scope.$location = $location;
        $scope.login = login;

        function login(user) {
            var user = UserService.findUserByCredentials(user, function (user) {
                if (user) {
                    $rootScope.currentUser = user;
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                }
            });
        }
    }
})();
