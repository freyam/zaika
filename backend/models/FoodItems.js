const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["veg", "non-veg"],
    },
    add_ons: {
        type: Array,
        required: false,
        default: [],
    },
    tags: {
        type: Array,
        required: false,
        default: [],
    },

    addOnsPrice: {
        type: Array,
        required: false,
        default: {},
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 10,
    },
    vendor: {
        type: String,
        required: true,
    },
});

module.exports = User = mongoose.model("FoodItems", FoodItemSchema);
