import express from 'express'
import session from 'express-session'
import sessionConfig from './config/session'
import passport from './config/passport'
import { config } from 'dotenv'
import db from './config/db'
import authRoute from './routes/auth'

// config
config()
const PORT = Number(process.env.PORT) || 5000
const app = express()
db.connect()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/auth', authRoute)
app.listen(PORT, () => console.log(`http://localhost:${PORT}/auth`))
