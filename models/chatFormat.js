const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  say: {
    type: String,
  },
  time: {
    type: String,
  },
});

module.exports = mongoose.model("chatRecord", chatSchema);
