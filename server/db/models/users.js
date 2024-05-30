const mongoose = require('mongoose');

const users = new mongoose.Schema({
    firstname: {
        type: "String",
        required: true
    },

    lastname: {
        type: "String",
        required: true
    },

    gender: {
        type : "string"
    },

    moble_no : {
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