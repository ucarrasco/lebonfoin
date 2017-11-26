import request from 'request-promise-native'
import cheerio from 'cheerio'
import _ from 'lodash'
import { Object } from 'core-js/library/web/timers';

let res = request('https://www.leboncoin.fr/ameublement/offres/languedoc_roussillon/herault/')
  .then(
    html => {
      const $ = cheerio.load(html)
      // let liste = $('.left-tab-section .table-responsive > table > tbody > tr')
      // let cpt = 0
      // liste.map((tr) => {
      //   if (cpt++ > 0) return;
      //   console.log(tr)
      // })

      // console.log($(itemsList[0]).html())

      let itemsList = []
      
      $('li[itemscope]').each((index, itemNode) => {
        let itemData = {
          id: $('.list_item', itemNode).attr('href').match(/(\d+)\.htm/)[1],
          itemUrl: 'https:' + $('.list_item', itemNode).attr('href'),
          title: $('> a', itemNode).attr('title'),
          numberOfImages: $('.item_imageNumber', itemNode).length ? parseInt($('.item_imageNumber', itemNode).text().trim()) : 0
        }
        
        if ($('.item_image .lazyload', itemNode).length)
          Object.assign(itemData, {
            thumbUrl:  $('.item_image .lazyload', itemNode).data('imgsrc'),
            imgUrl:  $('.item_image .lazyload', itemNode).data('imgsrc').replace('/ad-thumb/', '/ad-large/')
          })
          
        if ($('.item_price', itemNode).length)
          Object.assign(itemData, {
            price: $('.item_price', itemNode).text().trim()
          })

        itemsList.push(itemData)
      })
      return itemsList
    }
  )
  .then(
    itemsList => {
      return Promise.all(
        itemsList.map(
          item => request(item.itemUrl).then(
            itemHtml => {
              const $item = cheerio.load(itemHtml)
              let detailPageData = {
                description: $item('[itemprop=description]').text().trim()
              }

              if ($item('.thumbnails').length)
                Object.assign(detailPageData, {
                  nimages: $item('.thumbnails > ul > li').toArray().length,
                  images: itemHtml.match(/images\[\d\] = "[^"]+";/g).map(matchLine => matchLine.match(/images\[\d\] = "([^"]+)";/)[1]).map(imgUrl => ({ url: imgUrl, thumbUrl: imgUrl.replace('/ad-large/', '/ad-thumb/')}))
                })

              return Object.assign({}, item, detailPageData)
              // return {
              //   ...item,
              //   ...detailPageData
              // }
            }
          )
        )
      )
    }
  )
  .then(
    itemsList => {
      console.log(itemsList)
    }
  )

// console.log(res)