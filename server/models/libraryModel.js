const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const librarySchema = new Schema({
  userid: { type: String, required: true, unique: true },
  save: { type: Array },
});

module.exports = mongoose.model('library', librarySchema);