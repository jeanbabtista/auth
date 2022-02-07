import MongoStore from 'connect-mongo'
import db from './db'

export default {
    secret: process.env.SECRET || 'foo',
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({ mongoUrl: db.url }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}
