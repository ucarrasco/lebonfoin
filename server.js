require('dotenv').config()
import express from 'express'
import dbConnect from './helpers/dbHelper'
import configExpress from './config/express'
import Item from './models/Item'
import crawlAndPersist from './helpers/crawlAndPersist'

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

const port = process.env.PORT || 3000
const app = express()
configExpress(app)

// app.get('/items', function(req, res, next) {
//   Item.find().sort({date: 'desc'}).then(
//     items => {
//       res.send(items.map(item => item.toObject({ versionKey: false })))
//     },
//     next
//   )
// })

app.get('/*', function(req, res, next) {
  let leboncoinQuery = req.params[0]
  
  crawlAndPersist(`https://www.leboncoin.fr/${leboncoinQuery}`)
    .then(
      items => {
        res.send(items.map(item => item.toObject({ versionKey: false })))
      }
    )
})

dbConnect()
  .then(
    _ => {
      app.listen(port)
      console.log('Express app started on port ' + port)
    })