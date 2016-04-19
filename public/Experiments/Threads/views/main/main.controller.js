"use strict";
(function(){
    angular
        .module("Threads")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }

})();

