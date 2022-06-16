import mongoose from 'mongoose'

const recordModel = mongoose.Schema({
  timestamp: Date,
  ip: String
})

export default recordModel
