require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import webpackConfig from '../webpack.config'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'

export default app => {
  // app.use(express.static('public'))
  app.use(bodyParser.json()) // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
  }))

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
  
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  if (process.env.NODE_ENV == 'development')
    app.use(webpackMiddleware(webpack(webpackConfig), {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }))
  else
    app.use(express.static('assets'))

  
  if (process.env.NODE_ENV == 'development')
    app.disable('etag')
}
