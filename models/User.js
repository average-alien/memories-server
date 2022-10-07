// require mongoose ODM
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  avatar: {
    type: String
  },
  pfp: {
    type: String
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Memory'
  }],
  memoryId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Memory'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);