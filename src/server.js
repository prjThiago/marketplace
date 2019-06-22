require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const Youch = require('youch')
const validate = require('express-validation')
const sentry = require('@sentry/node')

const databaseConfig = require('./config/databse')
const sentryConfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    sentry.init(sentryConfig)
  }

  // eslint-disable-next-line class-methods-use-this
  database () {
    // atlas mongodb
    mongoose.connect(databaseConfig.uri_atlas, {
      useCreateIndex: true,
      useNewUrlParser: true
    })

    // localhostdocker
    // mongoose.connect();
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(sentry.Handlers.requestHandler())
  }

  routes () {
    this.express.use(routes)
  }

  exception () {
    // if (process.env.NODE_ENV === 'production') {
    this.express.use(sentry.Handlers.errorHandler())
    // }

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)

        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
