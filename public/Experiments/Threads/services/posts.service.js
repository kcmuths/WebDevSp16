"use strict";
(function(){
    angular
        .module("ThreaderApp")
        .factory("PostService", PostService);
    function PostService($rootScope){
        var o = {
            posts:[
                'post 1',
                'post 2'
            ]
        };
        return o;
    }
})();
