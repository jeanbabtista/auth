import express from 'express'
import { config } from 'dotenv'
import db from './config/db'
import routes from './routes'

// config
config()
const PORT = Number(process.env.PORT) || 5000
const app = express()
db.connect()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

// start server
app.listen(PORT, () => console.log(`http://localhost:${PORT}/auth`))
