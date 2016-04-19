"use strict";
(function(){
    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService){
        var model = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        setFields();

        function setFields(){
            FieldService.getFieldsForForm(formId).then(function(response){
                model.fields = response;
            });
        }
        model.addField = function(fieldType) {
            var newField;
            if (fieldType == 'Text') {
                newField = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            } else if (fieldType == 'TextArea') {
                newField = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            } else if (fieldType == 'Date') {
                newField = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType == 'DropDown') {
                newField = {
                    "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };

            }
            else if (fieldType == 'Checkboxes') {
                newField = {
                    "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };

            }
            else if (fieldType == 'Radio') {
                newField = {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };

            }
            FieldService.createFieldForForm(formId, field).then(function (response) {
                setFields();
            });
        }
        model.deleteField = function(fieldIndex){
            var fieldId = model.fields[fieldIndex]._id;
            FieldService.deleteFieldFromForm(formId, field).then(function(Response){
                setFields();
            });


            }
        }

})();
