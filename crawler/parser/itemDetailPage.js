import cheerio from 'cheerio'
import moment from 'moment-timezone'

export default itemHtml => {

  const $ = cheerio.load(itemHtml)

  let detailPageData = {
    description: $('<p>' + $('[data-qa-id=adview_description_container] > :first-child > span').html().replace(/<br>/g, "\n") + '</p>').text().trim(),
    date: moment.tz($('[data-qa-id=adview_date]').text().trim(), "DD/MM/YYYY [à] HH[h]mm", 'Europe/Paris'),
    location: {
      summary: $('[data-qa-id="adview_location_informations"] > span:first-child').text().trim()
    },
    images: (_ => {
      // no image
      if (!$('[data-qa-id=adview_gallery_container]').length) return []

      let fluxStateData = JSON.parse(itemHtml.match(/<script>window\.FLUX_STATE = (.+);?<\/script>/)[1])
      // console.log(JSON.stringify(fluxStateData, null, 2))

      return fluxStateData.adview.images.urls_large.map(
        largeUrl => ({
          url: largeUrl, 
          thumbUrl: largeUrl.replace('/ad-large/', '/ad-thumb/')
        })
      )
    })()
  }

  return detailPageData
}

// <script>window.FLUX_STATE = 