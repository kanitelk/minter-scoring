const mongoose = require('mongoose');

const GenesisSchema = new mongoose.Schema({
  address: String,
  value: Number,
  block: Number
},
  {
    timestamps: true
  });


module.exports = mongoose.model("Genesis", GenesisSchema);
