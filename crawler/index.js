import request from 'request-promise-native'

import parseItemsListPage from './parser/itemsListPage'
import parseItemDetailPage from './parser/itemDetailPage'
import parseNavigation from './parser/navigation'


export const crawlNavigation = _ =>
  request({ url: 'https://www.leboncoin.fr/annonces/offres/languedoc_roussillon/', encoding: 'latin1' })
    .then(parseNavigation)
        
export default url =>
  request({ url, encoding: 'latin1' })
    .then(parseItemsListPage)
    .then(
      itemsList => Promise.all(
        itemsList.map(
          itemData =>
            request({ url: itemData.url })
              .then(parseItemDetailPage)
              .then(detailPageData => Object.assign({}, itemData, detailPageData))
        )))