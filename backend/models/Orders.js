const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    total_price: {
        type: Number,
        required: true,
        default: 0,
    },
    vendor: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    add_ons: {
        type: Array,
        required: false,
        default: [],
    },
    status: {
        type: String,
        required: true,
        default: 0,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    user_name: {
        type: String,
        required: true,
    },
    food_name: {
        type: String,
        required: true,
        default: 0,
    },
});

module.exports = User = mongoose.model("Order", OrderSchema);
