const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    s_name: {
        type: String,
        required: true,
        unique: true,
    },
    o_time: {
        type: String,
        required: false,
    },
    c_time: {
        type: String,
        required: false,
    },
    m_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    c_no: {
        type: String,
        required: true,
    },
});

module.exports = User = mongoose.model("Vendors", VendorSchema);
