import cheerio from 'cheerio'

export default itemHtml => {

  const $ = cheerio.load(itemHtml)

  let detailPageData = {
    description: $('<p>' + $('[itemprop=description]').html().replace(/<br>/g, "\n") + '</p>').text().trim(),
    images: (_ => {
      // no image
      if (!$('.item_image > .lazyload').length) return []

      let multipleImagesMatch = itemHtml.match(/images\[\d\] = "[^"]+";/g)
      
      // multiple images
      if (multipleImagesMatch)
        return multipleImagesMatch
            .map(matchLine => matchLine.match(/images\[\d\] = "([^"]+)";/)[1])
            .map(imgUrl => ({
              url: imgUrl, 
              thumbUrl: imgUrl.replace('/ad-large/', '/ad-thumb/')
            }))

      // one image
      return [{
        url: $('.item_image > .lazyload').data('imgsrc').replace('/ad-image/', '/ad-large/'),
        thumbUrl: $('.item_image > .lazyload').data('imgsrc').replace('/ad-image/', '/ad-thumb/')
      }]
    })()
  }

  return detailPageData
}