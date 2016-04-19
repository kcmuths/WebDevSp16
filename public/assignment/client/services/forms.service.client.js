"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {
        var forms = [];
        /*forms: [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234}
        ]; */
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById

        };
        return service;

        function createFormForUser(user_id, form) {
            var deferred = $q.defer();
            //var url = "/api/assignment/user/" + userId + "/form";
            // console.log(url);
            http.post('/api/assignment/user/' + user_id + '/form', form)
                .success(function(response){
                    defer.resolve(response);
                });
            return deffered.promise;
         }

            /*var _id = (new Date).getTime();
            var formCreation = {
                "_id": _id,
                "userId": userId,
                "title": form["title"]
            };
            forms.push(formCreation);
            callback(formCreation); */

        function findAllFormsForUser(user_id) {
            var deferred = $q.defer();
            var url = "/api/assignment/user/" + user_id + "/form";
            console.log(url);
            $http.get(url).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
            /*var searchForms = [];
            for (var u =0; u <forms.length; u ++){
                if (forms[u].userId == userId) {
                    searchForms.push(forms[u]);
                }
            }
            callback(searchForms) */

        }


        function deleteFormById(form_id) {
            var deferred = $q.defer();
            var url = "/api/assignment/form" + form_id;
            //console.log(url);
            $http.delete(url).success(function(response){
                deferred.reslove(response);
            });
            return deferred.promise;
            /*var u = "";
            for (u in forms) {
                if (forms[u]._id == formId) {
                    forms.splice(u, 1);
                    callback(forms);
                    return;
                }
            } */
        }

        function updateFormById(form_id, new_form) {
            var deferred = $q.defer();
            var url = "/api/assignment/form" + form_id;
            //console.log(url);
            $http.put(url, new_form).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
            /*var u = "";
            for (u in forms) {
                if (forms[u]._id == formId) {
                    var formUpdate = {
                        "_id": newForm["_id"],
                        "userId": newForm["userId"],
                        "title": newForm["title"]
                    };
                    forms[u] = formUpdate;
                    callback(forms[u]);
                    return;
                }
            } */
        }
    }
})();
