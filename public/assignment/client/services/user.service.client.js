"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService($http, $q) {
        var model = {
            /*users: [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ],*/


            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByUsername: findUserByUsername
        };
        return model;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            var url = "/api/assignment/user?username=" + username;
     //       console.log(url);
            $http.get(url).success(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            var url = "/api/assignment/user?username=" + username + "&password=" + password;
       //     console.log(url);
            $http.get(url).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

            /*for (var u in model.users) {

                if (model.users[u].username == user.username && model.users[u].password == user.password) {
                    callback(model.users[u]);
            }

            }
            return null; */
        }


        function findAllUsers() {
            var deferred = $q.defer();
            var url = "api/assignment/user/";
            $http.get(url).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createUser(add_user) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user",add_user)
                .success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

            /*var new_user = {
                _id: (new Date).getTime(),
                username: user.username,
                password: user.password

            };
            model.users.push(new_user);
            callback(new_user); */
        }

        function deleteUserById(user_id) {
            var deferred = $q.defer();
            var url = "api/assignment/user/" + user_id;
            $http.delete(url, user_id).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }


        function updateUser(user_id, user_update) {
            var deferred = $q.defer();
            var url = "api/assignment/user/" + user_id;
            console.log(url);
            $http.put(url,user_update).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }

    }

})();