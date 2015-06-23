var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleId: { type: String, index: { unique: true } },
  name: String
});

module.exports = mongoose.model('User', UserSchema);
