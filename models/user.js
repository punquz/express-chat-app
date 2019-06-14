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
  sentRequest: [{
    username: {type: String, default: ''}
  }],
  request: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, default: ''}
  }],
  friendList: [{
    friendId: {type: Schema.Types.ObjectId, ref: 'User'},
    friendName: {type: String, default: ''} 
  }],
  totalRequest: {
    type: Number,
    default: 0
  },
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
