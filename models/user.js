const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
