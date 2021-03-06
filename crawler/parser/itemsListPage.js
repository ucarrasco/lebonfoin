import cheerio from 'cheerio'

export default html => {
  const $ = cheerio.load(html)

  let itemsList = []

  if (!$('li[itemscope]').length)
    return Promise.reject({ message: "There is no result to show"})
  
  $('li[itemscope]').each((index, itemNode) => {

    const $item = function(selector) { return $(selector, itemNode) }

    let itemData = {
      id: $item('.list_item').attr('href').match(/(\d+)\.htm/)[1],
      url: 'https:' + $item('.list_item').attr('href'),
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
        price: parseInt($item('.item_price').text().trim().match(/(\d+)\s*€/)[1])
      })

    itemsList.push(itemData)
  })
  
  return itemsList
}