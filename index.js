import crawl from './crawler'

crawl('https://www.leboncoin.fr/ameublement/offres/languedoc_roussillon/herault/')
  .then(
    itemsList => {
      console.log(itemsList)
    }
  )