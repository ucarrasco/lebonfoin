import mongoose from 'mongoose'

const ItemImageSchema = mongoose.Schema({
  url: String,
  thumbUrl: String
})

export default mongoose.model('Item', mongoose.Schema({
  remoteId: String,
  url: String,
  title: String,
  description: String,
  price: Number,
  images: [ItemImageSchema]
}))