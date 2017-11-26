import cheerio from 'cheerio'

export default html => {
  const $ = cheerio.load(html)

  let itemsList = []
  
  $('li[itemscope]').each((index, itemNode) => {

    const $item = function(selector) { return $(selector, itemNode) }

    let itemData = {
      id: $item('.list_item').attr('href').match(/(\d+)\.htm/)[1],
      itemUrl: 'https:' + $item('.list_item').attr('href'),
      title: $item('> a').attr('title'),
      numberOfImages: $item('.item_imageNumber').length ? parseInt($item('.item_imageNumber').text().trim()) : 0
    }
    
    if ($item('.item_image .lazyload').length)
      Object.assign(itemData, {
        thumbUrl:  $item('.item_image .lazyload').data('imgsrc'),
        imgUrl:  $item('.item_image .lazyload').data('imgsrc').replace('/ad-thumb/', '/ad-large/')
      })
      
    if ($item('.item_price').length)
      Object.assign(itemData, {
        price: $item('.item_price').text().trim()
      })

    itemsList.push(itemData)
  })
  
  return itemsList
}