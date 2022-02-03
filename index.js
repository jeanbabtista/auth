const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()

const db = {
  url: 'mongodb://localhost:27017/test',
  connect: async () => {
    try {
      const response = await mongoose.connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('Successfully connected to database')
    } catch (e) {
      console.log(e.message)
    }
  },
}

db.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'foo',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: db.url,
    }),
  }),
)
