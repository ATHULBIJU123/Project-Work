const mongoose = require('mongoose');
// const user_type = require('./user_type');

const users = new mongoose.Schema({
    name: {
        type: "String",
        required: true
    },

    gender: {
        type : "string"
    },

    mobile_no : {
        type : "string"
    },

    email: {
        type: "String",
        required: true,
        // unique: true
    },

    password: {
        type: "String",
        required : true,
    },


    user_type: {type: mongoose.Schema.Types.ObjectId, ref:"user_types"}

});

module.exports = mongoose.model("users", users);