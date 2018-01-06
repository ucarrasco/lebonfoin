require('dotenv').config()
import express from 'express'
import dbConnect from './helpers/dbHelper'
import configExpress from './config/express'
import Item from './models/Item'
import crawlAndPersist, { buildItemFromCrawledItemData } from './helpers/crawlAndPersist'
import crawl, { crawlNavigation } from './crawler'
import moment from 'moment-timezone'
import { stringify as stringifyQuery } from 'qs'
import webpackConfig from './webpack.config'

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

const port = process.env.PORT || 3000
const app = express()
configExpress(app)

// app.use('/api', function(req, res, next) {
//   res.send({api: "yes", url: req.url})
// })

app.get("/api/app/navigation", function(req, res, next) {
  crawlNavigation().then(navigation => { res.send(navigation) })
})

app.get('/api/*', function(req, res, next) {

  let path = req.params[0]
  let queryParams = stringifyQuery(req.query, { encode: false })

  let leboncoinQuery = `${req.params[0]}${ queryParams ? `?${queryParams}` : ''}`

  crawlAndPersist(`https://www.leboncoin.fr/${leboncoinQuery}`)
    .then(
      items => {
        res.send(items.map(item => item.toObject({ versionKey: false })))
      },
      error => {
        console.log(error.stack)
        next({error})
      }
    )
})


app.get('*', function (req, res, next) {
  res.send(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Webpack App</title>
      </head>
      <body>${
        req.url != '/' ? `
        <script type="text/javascript">var query="${req.url}";</script>` : '' }
        <script type="text/javascript" src="${webpackConfig.output.publicPath}${webpackConfig.output.filename}"></script>
      </body>
    </html>
`)
})

// app.get('/tetest', function(req, res, next) {
//   console.log({fly: req.headers.accept })
//   if (req.accepts('text/html'))
//     res.send('<p><strong>Hello world!</strong></p>')
//   else
//     res.send({foo: "bar"})
// })


dbConnect()
  .then(
    _ => {
      app.listen(port)
      console.log('Express app started on port ' + port)
    })