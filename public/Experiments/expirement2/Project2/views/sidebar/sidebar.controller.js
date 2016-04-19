"use strict";
(function(){
    angular
        .module("app")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope, $location){
        $scope.$location = $location;
    }
})();
