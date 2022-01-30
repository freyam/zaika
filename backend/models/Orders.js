const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    food_name: {
        type: String,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        required: true,
        default: 0,
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
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = User = mongoose.model("Order", OrderSchema);
