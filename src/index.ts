import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { join } from 'path'
import { config } from 'dotenv'
import sessionConfig from './config/session'
import passport from './config/passport/index'
import db from './config/db'
import routes from './routes'

// config
config()
const PORT = Number(process.env.PORT) || 5000
const app = express()
db.connect()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, 'public'))) // for angular
app.use(routes)

// start server
app.listen(PORT, () => console.log(`http://localhost:${PORT}/auth`))
