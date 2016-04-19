"use strict";

module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId", function(req, res) {
        var form_id = req.params.formId;
        model
            .FindById(form_id)
            .then(function(form) {
                res.json(form);
            });
    });

    app.get("/api/assignment/user/:userId/form", function(req, res) {
        var user_id = req.params.userId;
        model
            .FindFormsByUserId(user_id)
            .then(function(form) {
                res.json(form);
            });
    });

    app.delete("/api/assignment/form/:formId", function(req, res) {
        var form_id = req.params.formId;
        model
            .Delete(form_id)
            .then(function(stat) {
                res.json(stat);
            });
    });

    app.post("/api/assignment/user/:userId/form", function(req, res) {
        var user_id = req.params.userId
        model
            .Create(req.body, user_id)
            .then(function(form) {
                res.json(form);
            });
    });

    app.put("/api/assignment/form/:formId", function(req, res) {
        //console.log("got put update request");
        var form_id = req.params.formId;
        model
            .Update(form_id, req.body)
            .then(function(updated_form) {
                res.json(updated_form);
            });
    });

}
