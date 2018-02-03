import mongoose from 'mongoose'
mongoose.Promise = global.Promise
import dbConnect from './helpers/dbHelper'
import { crawlAndItems } from './helpers/crawlAndPersist'
import Item from './models/Item'
import moment from 'moment-timezone'
import { crawlNavigation } from './crawler'
import request from 'request-promise-native'
import parseItemDetailPage from './crawler/parser/itemDetailPage'
import parseItemsListPage from './crawler/parser/itemsListPage'

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


// crawlAndItems('https://www.leboncoin.fr/electromenager/offres/languedoc_roussillon/herault/')
//   .then(console.log)

request({ url: 'https://www.leboncoin.fr/electromenager/1379109998.htm?ca=13_s' })
  .then(parseItemDetailPage)
  .then(console.log)

// crawlNavigation().then(navigation => {
//   console.log(JSON.stringify(navigation, null, 2))
// })

