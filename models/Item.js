import mongoose from 'mongoose'
require('mongoose-moment')(mongoose)

const itemImageSchema = mongoose.Schema({
  url: String,
  thumbUrl: String
})

const itemLocationSchema = mongoose.Schema({
  summary: String
})

const itemSchema = mongoose.Schema({
  remoteId: {
    type: String,
    unique: true
  },
  url: String,
  title: String,
  description: String,
  location: itemLocationSchema,
  price: Number,
  images: [itemImageSchema],
  date: 'Moment'
})

export default mongoose.model('Item', itemSchema)

