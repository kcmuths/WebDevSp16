"use strict";
var q = require("q");
var uUid = require("node-uuid");

module.exports = function(db, mongoose){
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = require("./user.schema.server.js")(mongoose);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        FindUserByUsername: FindUserByUsername,
        FindUserByCredentials: FindUserByCredentials
    };
    return api;

    function Create(user) {
        console.log("Create() is used")
        var deferred = q.defer();
        user.id = user._id = mongoose.Types.ObjectId();
        UserModel.create(user, function (error, new_user) {
            if (error)
                deferred.reject(error);
            else deferred.resolve(new_user);
        });
        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();
        UserModel.find(function(error, users){
            if(error) {
                deferred.reject(error);
            }
            else {
                deferred.resolve(user);
            }


        });
        return deferred.promise;
    }

    function FindById(id){
        var deferred = q.defer();
        UserModel.findOne({id : id}, function(error, user) {
            if (error) {
                deferred.reject(error);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
        }

    function Update(id, new_user) {
        var deferred = q.defer();
        UserModel.findOneAndUpdate({
            id: id
        }, {
            firstName: new_user.firstName,
            lastName: new_user.lastName,
            username: new_user.username,
            password: new_user.password,
            email: new_user.email
        }, function(error, result){
            deferred.resolve(new_user);
        });
        return deferred.promise;

        /*var chUser = users.indexOf(id);
        users[chUser].username = user.username;
        users[chUser].firstName = user.firstName;
        users[chUser].lastName = user.lastName;
        return users; */
    }

    function Delete(id){
        var deferred = q.defer();
        UserModel.remove({id: id}, function(error){
            if(error){
                deferred.reject(error);
            }
            else {
                FindAll()
                    .then(function(users){
                        deferred.resolve(users);
                    });
            }
        });
        return deferred.promise;
       /* var i = FindById(id);
        var delUser = users.indexOf(i);
        users.splice(delUser,1);
        return users; */
        }

    function FindUserByUsername(username){
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(error, user){
            if(error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
        /*for(var i=0;i < users.length; i++)
        {

            if(users[i].username == username){
                return users[i];
            }
        }
        return null; */
    }
    function FindUserByCredentials(credentials){
        var deferred = q.defer();
        UserModel.findOne(credentials, function(error, user){
            if(error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
      /*  for(var i=0; i< users.length; i++){
            if(users[i].username == credentials.username && users[i].password == credentials.password)
            return users[i];
        }
        return null; */
    }
};
