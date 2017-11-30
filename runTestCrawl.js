import mongoose from 'mongoose'
mongoose.Promise = global.Promise
import dbConnect from './helpers/dbHelper'
import { crawlAndItems } from './helpers/crawlAndPersist'
import Item from './models/Item'

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

// dbConnect()
//   .then(_ => crawlAndPersist('https://www.leboncoin.fr/ameublement/offres/languedoc_roussillon/herault/'))
//   .then(items => {
//     console.log('Crawl ok')
//     return items
//   })
//   .finally(_ => { mongoose.disconnect() })



crawlAndItems('https://www.leboncoin.fr/ameublement/offres/languedoc_roussillon/herault/')
  .then(items => {
    console.log('Crawl ok')
    return items
  })
