const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  address: String,
  score: Number,
  transactions: Number,
  scamTx: Array,
  respectTx: Array,
  verificationTx: Array,
  totalDelegatedBip: Number,
  totalBip: Number,
  balances: Array,
  genesis: Boolean,
  delegatedKarma: Number,
  balanceKarma: Number,
  receivedKarma: Number,
  txDynamics: Array,
  age: Date,
  coins: Array,
  existCoins: Number,
  icon: String,
  iconName: String,
  smart_expert: Number,
  smart_rating: Number
},
  {
    timestamps: true
  });

module.exports = mongoose.model("Wallet", WalletSchema);
