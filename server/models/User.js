const mongoose = require('mongoose');
const { createHash } = require('../helpers/bcrypt');
const validator = require('validator');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
    validate: [validator.isEmail, 'Please enter a valid E-mail!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate(value) {
      if (!validator.isLength(value, { min: 6, max: 1000 })) {
        throw Error('Length of the password should be between 6-1000');
      }
    },
  },
  image_url: String,
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

schema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await createHash(this.password);
    return next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model('User', schema);
