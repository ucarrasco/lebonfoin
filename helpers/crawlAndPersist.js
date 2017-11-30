import crawl from '../crawler'
import Item from '../models/Item'
import mongoose from 'mongoose'

export const buildItemFromCrawledItemData =
  crawledItem => {
    let { id: remoteId, url, title, description, price, images, date, location } = crawledItem
    return new Item({ remoteId, url, title, description, price, images, date, location })
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