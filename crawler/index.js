import request from 'request-promise-native'

import parseItemsListPage from './parser/itemsListPage'
import parseItemDetailPage from './parser/itemDetailPage'

export default url =>
  request(url)
    .then(parseItemsListPage)
    .then(
      itemsList => Promise.all(
        itemsList.map(
          itemData => request(itemData.itemUrl).then(parseItemDetailPage).then(detailPageData => Object.assign({}, itemData, detailPageData))
        )))