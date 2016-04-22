"use strict";
(function(){
    angular
        .module("ThreaderApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }
})();
