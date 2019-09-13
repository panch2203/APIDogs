const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,

});

module.exports = mongoose.model('dogs', dogSchema);
