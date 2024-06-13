const mongoose= require('mongoose');

const user_type = new mongoose.Schema(
    {
    user_type: "string",
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user_type",user_type);