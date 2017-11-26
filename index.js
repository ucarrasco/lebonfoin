import crawl from './crawler'
import dbConnectThen from './helpers/dbHelper'
import mongoose from 'mongoose'
import persistCrawledItems from './crawlPersister'

dbConnectThen(
  _ =>
    crawl('https://www.leboncoin.fr/ameublement/offres/languedoc_roussillon/herault/')
      .then(persistCrawledItems)
      .then(items => {
        console.log(items.length)
      })
)

