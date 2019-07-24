const mongoose = require("mongoose");
import { config } from './config'

mongoose.connect(config.db, { useNewUrlParser: true });

const db1 = mongoose.connection;

db1.on("error", console.error.bind(console, "MongoDB connection error:"));
db1.once("open", function() {
  console.log("MongoDB connected!");
});

module.exports = mongoose.connection;
