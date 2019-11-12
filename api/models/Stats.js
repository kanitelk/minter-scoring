const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema(
  {
    _id: Date,
    username: String,
    first_name: String,
    last_name: String,
    req: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true,
    _id: false
  }
);

module.exports = mongoose.model("Stats", StatsSchema);
