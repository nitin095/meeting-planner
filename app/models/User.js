'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Schema Declaration
let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  countryCode: {
    type: Number,
    default: 91
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  createdOn: {
    type: Date,
    default: ""
  },
  resetPasswordToken: {
    type: String,
    default: undefined
  },
  resetPasswordExpires: {
    type: Date,
    default: undefined
  }

})


mongoose.model('User', userSchema);