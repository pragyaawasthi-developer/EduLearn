const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { collection: 'pragyauser-reg' }); // Collection name in MongoDB

// Pre-save middleware to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      // Hash the password with bcrypt and 12 salt rounds
      this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
