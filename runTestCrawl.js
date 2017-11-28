import mongoose from 'mongoose'
mongoose.Promise = global.Promise

import dbConnect from './helpers/dbHelper'
import crawlAndPersist from './helpers/crawlAndPersist'

import Item from './models/Item'

dbConnect()
  .then(_ => crawlAndPersist('https://www.leboncoin.fr/ameublement/offres/languedoc_roussillon/herault/'))
  .then(items => {
    console.log('Crawl ok')
    return items
  })
  .finally(_ => { mongoose.disconnect() })