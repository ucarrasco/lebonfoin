import mongoose from 'mongoose'

const ItemImageSchema = mongoose.Schema({
  url: String,
  thumbUrl: String
})

export default mongoose.model('Item', mongoose.Schema({
  remoteId: {
    type: String,
    unique: true
  },
  url: String,
  title: String,
  description: String,
  price: Number,
  images: [ItemImageSchema]
}))