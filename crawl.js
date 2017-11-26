import crawl from './crawler'
import dbConnect from './helpers/dbHelper'
import mongoose from 'mongoose'
import persistCrawledItems from './crawlPersister'

dbConnect()
  .then(
    _ => {
      crawl('https://www.leboncoin.fr/ameublement/offres/languedoc_roussillon/herault/')
        .then(persistCrawledItems)
        .then(items => {
          console.log(items.length)
        })
    }
  )
  .then(_ => { mongoose.disconnect() })