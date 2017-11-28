import crawl from '../crawler'
import Item from '../models/Item'
import mongoose from 'mongoose'

const buildItemFromCrawledItemData =
  crawledItem => {
    let { id: remoteId, url, title, description, price, images, date } = crawledItem
    return new Item({ remoteId, url, title, description, price, images, date })
  }

export const persistCrawledItems =
  crawledItems =>
    Promise.all(crawledItems.map(
      crawledItem => 
        Item.findOne({ remoteId: crawledItem.id })
          .then(item => ( item || buildItemFromCrawledItemData(crawledItem).save() ) )
    ))

export const crawlAndPersist = url => crawl(url).then(persistCrawledItems)

export default crawlAndPersist