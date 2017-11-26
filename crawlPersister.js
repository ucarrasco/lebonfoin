import Item from './models/Item'

export const buildItemFromCrawledItem =
  crawledItem => {
    let {
      id: remoteId,
      itemUrl: url,
      title,
      description,
      price,
      images,
      date
    } = crawledItem

    return new Item({
      remoteId,
      url,
      title,
      description,
      price,
      images,
      date
    })
  }

export const persistCrawledItems =
  crawledItems =>
    Promise.all(crawledItems.map(
      crawledItem => 
        Item.findOne({ remoteId: crawledItem.id })
          .then(item => (item || buildItemFromCrawledItem(crawledItem).save()))
    ))

export default persistCrawledItems