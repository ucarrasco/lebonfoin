import cheerio from 'cheerio'
import moment from 'moment-timezone'

const frenchMonthes = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre'
]

const parseDate = dateCheerioElement => {
  let [, dayStr, monthWordStr, hourStr, minuteStr] = dateCheerioElement.text().trim().match(/Mise en ligne le (\d+) ([^\s]+) à (\d+):(\d+)/)
  let [day, hour, minute] = [dayStr, hourStr, minuteStr].map(str => parseInt(str))
  let month = frenchMonthes.indexOf(monthWordStr)
  let year = parseInt(dateCheerioElement.attr('content').split('-')[0])
  return moment.tz([year, month, day, hour, minute], 'Europe/Paris')
}

export default itemHtml => {

  const $ = cheerio.load(itemHtml)

  let detailPageData = {
    description: $('<p>' + $('[itemprop=description]').html().replace(/<br>/g, "\n") + '</p>').text().trim(),
    date: parseDate($('[itemprop=availabilityStarts]')),
    location: {
      summary: $('[itemprop="address"]').text().trim()
    },
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