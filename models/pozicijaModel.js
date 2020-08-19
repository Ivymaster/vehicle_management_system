const mongoose = require('mongoose');

const pozicijaSchema = new mongoose.Schema({
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  vrijeme: {
    type: Date,
    default: Date.now()
  }
});

const Pozicija = mongoose.model('Pozicija', pozicijaSchema);

module.exports = Pozicija;
