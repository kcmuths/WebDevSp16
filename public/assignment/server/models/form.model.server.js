"use strict";
var q = require("q");
var uuid = require("node-uuid");
var uuid4 = uuid.v4();

module.exports = function(app, mongoose){
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel= mongoose.model("FormModel", FormSchema);

    var api = {
        Create : Create,
        FindAll : FindAll,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        FindFormByTitle : FindFormByTitle,
        FindFormsByUserId : FindFormsByUserId,
        AddFormField : AddFormField,
        FindField : FindField,
        UpdateFormField : UpdateFormField,
        DeleteFormField : DeleteFormField
    }

    return api;

    function Create(form,user_id){
        console.log(userId + " 7");
        console.log(form);
        var deferred = q.defer();
        form.userId = user_id;
        form.fields = [];
        FormModel.create(form, function(error, form){
            if(error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(form)
            }
        });
        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();
        FormModel.find(function(error, forms){
            if(error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function FindById(id){
        var deferred = q.defer();
        FormModel.findbyId(id, function(error, form){
            if(error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function Update(id, update_form){
        var deferred = q.defer();
        FormModel.findbyId(id, function(error, form) {
            if(error) {
                deferred.reject(error);
            } else {
                form.name = update_form.name;
                form.save(function(error, uform) {
                    deferred.resolve(uform);
                });
            }
        });
        return deferred.promise;

    }

    function Delete(id){
        var deferred = q.defer();
        FormModel.remove({_id: id}, function(error, status){
            if(error){
                deferred.reject(error);
            }
            else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;

    }

    function FindFormByTitle(title){
        var deferred = q.defer();
        FormModel.find({userId: user_id}, function(error, forms){
            if(error){
                deferred.reject(error);
            }
            else {
                deferred.reslove(forms);
            }
        });
        return deferred.promise;

    }

    function FindFormsByUserId(user_id){
        var deferred = q.defer();
        FormModel.find({userId: user_id}, function(error, forms){
            if(error) {
                deferred.reject(error);
            }
            else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;

    }

    function AddFormField(form_id, add_field){
        var deferred = q.defer();
        FormModel.findbyId(form_id, function(error, form){
            if(error){
                deferred.reject(error);
            }
            else {
                var formFields = form.fields;
                formFields.push(add_field);
                form.fields = formFields;
                form.save(function(error, document){
                    if(error){
                        deferred.reject(error);
                    }
                    else {
                        deferred.resolve(document);
                    }
                });
            }

        });
        return deferred.promise;
    }

    function FindField(form_id,field_id){
            var deferred = q.defer();
            FormModel.findbyId(form_id, function(error, form){
                if(error) {
                    deferred.reject(error);
                } else {
                    var formFields = form.fields;
                    for(var i=0; i<formFields.length; i++){
                        if(formFields[i]._id == field_id){
                            deferred.resolve(formFields[i]);
                        }
                    }
                }
            });
            return deferred.promise;

    }

    function UpdateFormField(form_id, field_id){
        var deferred = q.defer();
        FormModel.findbyId(form_id, function(error, form){
            if(error)
            {
                deferred.reject(error);
            }
            else {
                var formFields = form.fields;
                for( var i = 0; i<formFields.length; i++){
                    if(formFields[i]._id == field_id){
                        formFields[i] = updated_field;
                        break;
                    }
                }
                form.fields = formFields;
                form.save(function(error, updated_form){
                    if(error) {
                        deferred.reject(error);
                    }
                    else {
                        deferred.resolve(updated_form);
                    }
                });
            }
        });
        return deferred.promise;


        /*for(var i = 0; i<forms.length; i++){
            if(forms[i]._id === formId){
                for(var j = 0; j<forms[i].fields.length; j++){
                    if(forms[i].fields[j]._id === fieldId){
                        forms[i].fields[j] = field;
                    }
                }
            }
        } */
    }

    function DeleteFormField(form_id, field_id) {
        var deferred = q.defer();
        FormModel.findById(form_id, function(error, form){
            if(error)
                deferred.reject(error);
            else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == field_id){
                        formFields.splice(i,1);
                    }
                }
                form.fields = formFields;
                form.save(function(error, updatedForm) {
                    if(error) {
                        deferred.reject(error);
                    } else {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;

    }


};