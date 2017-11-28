import request from 'request-promise-native'

import parseItemsListPage from './parser/itemsListPage'
import parseItemDetailPage from './parser/itemDetailPage'

export default url =>
  request({ url, encoding: 'latin1' })
    .then(parseItemsListPage)
    .then(
      itemsList => Promise.all(
        itemsList.map(
          itemData =>
            request({ url: itemData.url, encoding: 'latin1' })
              .then(parseItemDetailPage)
              .then(detailPageData => Object.assign({}, itemData, detailPageData))
        )))