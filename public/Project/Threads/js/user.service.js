"use strict";
(function()
{
    angular
        .module("Threads")
        .factory("UserService", UserService);
    function UserService($rootScope) {
        var model = {
            users: [
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
            ],


            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return model;

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function findUserByCredentials(user, callback) {

            for (var u in model.users) {

                if (model.users[u].username == user.username && model.users[u].password == user.password) {
                    callback(model.users[u]);
                }

            }
            return null;
        }


        function findAllUsers(callback) {
            callback(model.users);
        }

        function createUser(user, callback) {
            var new_user = {
                _id: (new Date).getTime(),
                username: user.username,
                password: user.password

            };
            model.users.push(new_user);
            callback(new_user);
        }

        function deleteUserById(userId, callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    var tmp = model.users[u];
                    model.users.pop(tmp);
                    callback(model.users);
                }
            }
        }

        /*function findUserById(userId){
         //  for (var u in model.users){
         //    if(model.users[u]._id === userId){
         //      return model.users[u];
         // }
         //}
         //return null;
         //} */

        function updateUser(userId, user, callback) {
            for (var u in model.users) {
                if (model.users[u]._id == userId) {
                    var new_User = model.users[u];
                    new_User.firstName = user.firstName;
                    new_User.lastName = user.lastName;
                    callback(new_User);
                }
            }
        }



    }

})();

