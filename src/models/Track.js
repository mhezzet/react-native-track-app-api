const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema(
  {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  },
  { timestamps: true }
)

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  locations: [pointSchema]
})

const Track = mongoose.model('track', trackSchema)

module.exports = Track
