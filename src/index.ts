import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { config } from 'dotenv'
import db from './config/db'

config()
const app = express()
db.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        secret: process.env.SECRET || 'foo',
        saveUninitialized: true,
        resave: false,
        store: MongoStore.create({ mongoUrl: db.url }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    })
)

app.get('/', (req, res) => {
    console.log(req.session)
    res.json({ msg: 'Hello World!' })
})

const PORT = 5000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
