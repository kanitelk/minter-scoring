const mongoose = require("mongoose");

const BlackListSchema = mongoose.Schema(
  {
    _id: String,
    description: String,
    from: String
  },
  {
    timestamps: true,
    _id: false
  }
);

module.exports = mongoose.model("BlackList", BlackListSchema);
