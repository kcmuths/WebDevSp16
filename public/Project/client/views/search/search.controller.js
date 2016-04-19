"use strict";
(function(){
    angular
        .module("EventApp")
        .controller("SearchController", searchController);
    function searchController($scope)
    {
        var eventsearch = [
            {eventname: "Spotlight", eventlocation: "Boston AMC", eventdate: new Date(), eventcategory: "film"},
            {eventname: "Black Sabbath", eventlocation: "madison Square Garden", eventdate: new Date(2016, 10, 1), eventcategory: "concert"}
        ];
        $scope.eventsearch = eventsearch;
    }
})();

