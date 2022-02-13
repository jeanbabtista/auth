import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jsonErrorHandler from 'express-json-error-handler'
import passport from './config/passport'
import db from './config/db'
import routes from './routes'

// config
config()
const PORT = Number(process.env.PORT) || 5000
const app = express()
db.connect()

// middleware
app.use(cors({ credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(jsonErrorHandler())
app.use(passport.initialize())
app.use(routes)

// start server
app.listen(PORT, () => console.log(`http://localhost:${PORT}/auth/google`))
