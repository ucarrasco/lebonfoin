require('dotenv').config()
import express from 'express'
import dbConnect from './helpers/dbHelper'
import configExpress from './config/express'
import Item from './models/Item'

const port = process.env.PORT || 3000
const app = express()
configExpress(app)

app.get('/items', function(req, res, next) {
  Item.find().sort({date: 'desc'}).then(
    items => {
      res.send(items.map(item => item.toObject({ versionKey: false })))
    },
    next
  )
})

dbConnect()
  .then(
    _ => {
      app.listen(port)
      console.log('Express app started on port ' + port)
    })