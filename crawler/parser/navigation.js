import cheerio from 'cheerio'
import _ from 'lodash'

export default html => {
  const $ = cheerio.load(html)
  
  let navigation = []

  $('.footerCategories li').each((index, li) => {

    (
      $(li).hasClass("title") ? 
        navigation : 
        _(navigation).last().navigation || (_(navigation).last().navigation = [])
    ).push({
      label: $(li).text().trim(),
      query: $("a", li).attr("href").match(/\/\/www.leboncoin.fr(\/.+\/)/)[1]
    })

  })
  
  return navigation
}