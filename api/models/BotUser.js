const mongoose = require("mongoose");

const BotUserSchema = new mongoose.Schema({
  chatId: Number,
  req: Number
},
  {
    timestamps: true
  });

module.exports = mongoose.model("BotUser", BotUserSchema);
