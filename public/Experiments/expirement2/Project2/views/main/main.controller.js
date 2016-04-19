"use strict";
(function(){
    angular
        .module("app")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }

})();

