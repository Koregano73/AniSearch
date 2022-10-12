const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// const myURI = 'mongodb+srv://Chris:test@gradassessment.ywrnwbq.mongodb.net/?retryWrites=true&w=majority';

// // UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;
// mongoose.connect(URI);

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  library: { type: Array, "default": [] },
});

module.exports = mongoose.model('User', userSchema);
