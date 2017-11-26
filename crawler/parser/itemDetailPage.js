import cheerio from 'cheerio'

export default itemHtml => {

  const $ = cheerio.load(itemHtml)

  let detailPageData = {
    description: $('[itemprop=description]').text().trim()
  }

  if ($('.thumbnails').length)
    Object.assign(detailPageData, {
      // numberOfImages: $('.thumbnails > ul > li').toArray().length,
      images: itemHtml.match(/images\[\d\] = "[^"]+";/g).map(matchLine => matchLine.match(/images\[\d\] = "([^"]+)";/)[1]).map(imgUrl => ({ url: imgUrl, thumbUrl: imgUrl.replace('/ad-large/', '/ad-thumb/')}))
    })

  return detailPageData
}