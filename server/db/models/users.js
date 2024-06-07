const mongoose = require('mongoose');

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
    }


});

module.exports = mongoose.model("users", users);