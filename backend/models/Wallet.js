const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: false,
        default: 10,
    },
});

module.exports = User = mongoose.model("Wallet", WalletSchema);
