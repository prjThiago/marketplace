const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const databaseConfig = require('./config/databse')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.database()
    this.middlewares()
    this.routes()
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
  }

  routes () {
    this.express.use(routes)
  }
}

module.exports = new App().express
