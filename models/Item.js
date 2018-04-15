import mongoose from 'mongoose'

export default mongoose.model('Item', mongoose.Schema({
  remoteId: String,
  title: String
}))