import express from 'express'
import { config } from 'dotenv'
import jsonErrorHandler from 'express-json-error-handler'
import passport from './config/passport'
import db from './config/db'
import routes from './routes'
import { checkCors } from './middleware/cors'

// config
config()
const PORT = Number(process.env.PORT) || 5000
const app = express()
db.connect()

// middleware
app.use(checkCors)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(jsonErrorHandler())
app.use(passport.initialize())
app.use(routes)

// start server
app.listen(PORT, () => console.log(`http://localhost:${PORT}/auth/google`))
