const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    c_no: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    batch: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = User = mongoose.model("Users", UserSchema);
