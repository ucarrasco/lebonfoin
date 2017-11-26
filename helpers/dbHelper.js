require('dotenv').config()
import mongoose from 'mongoose'
mongoose.Promise = global.Promise

export default function() {
  let options = {
    useMongoClient: true,
    promiseLibrary: global.Promise
  }
  return mongoose.connect(process.env.DATABASE_URL, options)
}