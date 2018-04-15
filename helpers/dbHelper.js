require('dotenv').config()
import mongoose from 'mongoose'
mongoose.Promise = global.Promise

function connect() {
  let options = {
    useMongoClient: true,
    promiseLibrary: global.Promise
  }
  return mongoose.connect(process.env.DATABASE_URL, options)
}




export default function(connectedCallback) {
  connect()
    .then(
      connectedCallback
    )
    .finally(_ => {
      mongoose.disconnect()
    })
}