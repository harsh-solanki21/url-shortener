const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Shrink = new Schema({
  original: {
    type: String,
    required: true,
    unique: true,
  },
  shortened: {
    type: String,
  },
  alias: {
    type: String,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const urlModel = mongoose.model('urls', Shrink)

module.exports = urlModel
