const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user schema

const clubSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  country: {
    type: String
  },
  image: {
    type: String,
    default: 'default.png'
  },
  fans: [{
        username: {type: String, default: ''},
        email: {type: String, default: ''}
  }],
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model("Club", clubSchema);
