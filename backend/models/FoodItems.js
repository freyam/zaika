const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
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
    vendor: {
        type: String,
        required: true,
    },
    addOnsPrice: {
        type: Array,
        required: false,
        default: {},
    },
});

module.exports = User = mongoose.model("FoodItems", FoodItemSchema);
