require('dotenv').config()
import express from 'express'
import dbConnect from './helpers/dbHelper'
import configExpress from './config/express'
import Item from './models/Item'
import crawlAndPersist, { buildItemFromCrawledItemData } from './helpers/crawlAndPersist'
import crawl, { crawlNavigation } from './crawler'
import moment from 'moment-timezone'
import { stringify as stringifyQuery } from 'qs'

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

const port = process.env.PORT || 3000
const app = express()
configExpress(app)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})


// app.get('/items', function(req, res, next) {
//   Item.find().sort({date: 'desc'}).then(
//     items => {
//       res.send(items.map(item => item.toObject({ versionKey: false })))
//     },
//     next
//   )
// })

app.get("/app/navigation", function(req, res, next) {
  crawlNavigation().then(navigation => { res.send(navigation) })
})

app.get('/*', function(req, res, next) {

  let path = req.params[0]
  let queryParams = stringifyQuery(req.query, { encode: false })

  let leboncoinQuery = `${req.params[0]}${ queryParams ? `?${queryParams}` : ''}`

  crawlAndPersist(`https://www.leboncoin.fr/${leboncoinQuery}`)
    .then(
      items => {
        res.send(items.map(item => item.toObject({ versionKey: false })))
      },
      error => {
        console.log(error.stack)
        next({error})
      }
    )
})

dbConnect()
  .then(
    _ => {
      app.listen(port)
      console.log('Express app started on port ' + port)
    })