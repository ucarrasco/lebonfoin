import crawl from './crawler'

import dbConnectThen from './helpers/dbHelper'
import mongoose from 'mongoose'
import Item from './models/Item'

dbConnectThen(
  _ =>
    crawl('https://www.leboncoin.fr/ameublement/offres/languedoc_roussillon/herault/')
      .then(
        itemsList =>
          Promise.all(itemsList.map(
            crawledItem => 
              Item.findOne({ remoteId: crawledItem.id })
                .then(item => item ?
                    item
                    : new Item({
                      remoteId: crawledItem.id,
                      url: crawledItem.itemUrl,
                      title: crawledItem.title,
                      description: crawledItem.description,
                      price: crawledItem.price,
                      images: crawledItem.images
                    })
                      .save()
                      .then(item => {
                        console.log('save ok!', crawledItem)
                        return item
                      })
                )
              
          ))
      )
      .then(items => {
        // console.log(items.length)
      })
)

