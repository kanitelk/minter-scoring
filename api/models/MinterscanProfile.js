const mongoose = require('mongoose');

const MinterscanProfileSchema = new mongoose.Schema({
  _id: String,
  address: String,
  title: String,
  description: String,
  www: String,
  icon: String,
  full_icon: String,
  isVerified: Boolean
},
  {
    timestamps: true,
    _id: false
  })

module.exports = mongoose.model("MinterscanProfile", MinterscanProfileSchema);