"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService) {
        var user_id = $rootScope.currentUser.id;
        $scope.new_form = {};
        FormService.findAllFormsForUser(user_id).then(function(forms){
            $scope.forms = forms;
        });


        $scope.addForm = function(){
            FormService.createFormForUser(user_id, $scope.new_form).then(function(form){
                $scope.forms.push(form);
                $scope.new_form = {};
            });
        }

        $scope.updateForm = function(){
            if ($scope.selectedForm) {
                FormService.updateFormById($scope.selectedForm._id, $scope.new_form).then (function(form) {
                    FormService.findAllFormsForUser(user_id).then(function(forms){
                        $scope.forms = forms;
                    });
                });
            }}

        $scope.deleteForm = function(index) {
            FormService.deleteFormById($scope.forms[index]._id).then(function(forms){
                $scope.forms.splice(index, 1);
            });
        }

        $scope.selectForm = function(index) {
            $scope.selectedForm = $scope.forms[index];
            $scope.new_form.name = $scope.selectedForm.name;
        }

        $scope.navigate = function(index) {
            var url = "/user/" + user_id + "/form/" + $scope.forms[index]._id + "/fields";
            $location.path(url);
        }

    }
})();
