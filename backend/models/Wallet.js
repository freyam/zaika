const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WalletSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    amount: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = User = mongoose.model("Wallet", WalletSchema);