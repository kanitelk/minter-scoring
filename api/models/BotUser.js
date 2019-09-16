const mongoose = require('mongoose');

const BotUserSchema = new mongoose.Schema({
  _id: Number,
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
  });

module.exports = mongoose.model("BotUser", BotUserSchema);
