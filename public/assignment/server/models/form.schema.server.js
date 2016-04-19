"use strict";
module.exports = function(mongoose){
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FormSchema = new mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: Date,
        updated: Date

    }, {collection: "cs5610.assignment.form"});
    return FormSchema;
};
