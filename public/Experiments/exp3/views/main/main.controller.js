"use strict";
(function(){
    angular
        .module("EventApp")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }

})();
