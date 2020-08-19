const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  number: {
    type: String,
    unique: true,
    required: [true, 'Potrebno unijeti broj modula!'],
  },

  lokacije: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Pozicija',
    },
  ],
});

userSchema.pre('save', function (next) {
  next();
});
userSchema.pre('find', function (next) {
  this.populate({
    path: 'lokacije',
  });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
