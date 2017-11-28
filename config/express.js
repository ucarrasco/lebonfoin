import express from 'express'
import bodyParser from 'body-parser'

export default app => {
  // app.use(express.static('public'))
  app.use(bodyParser.json()) // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
  }))
  
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
}
