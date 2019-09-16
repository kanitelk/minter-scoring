const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  _id: String,
  address: String,
  score: Number,
  icon: String,
  iconName: String,
},
  {
    timestamps: true,
    _id: false
  });


module.exports = mongoose.model("Wallet", WalletSchema);
