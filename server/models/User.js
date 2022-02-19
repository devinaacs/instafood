const mongoose = require('mongoose');
const { createHash } = require('../helpers/bcrypt');
const validator = require('validator');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username must be unique'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
    validate: [validator.isEmail, 'Invalid email format'],
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
    select: false,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
    select: false,
  },
});

schema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();

  this.password = await createHash(this.password);
  return next();
});

module.exports = mongoose.model('User', schema);
