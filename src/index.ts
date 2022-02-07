import express from 'express'
import session from 'express-session'
import passport from 'passport'
import sessionConfig from './config/session'
import { config } from 'dotenv'
import db from './config/db'
import authRoute from './routes/auth'

// config (environment variables, database)
config()
const PORT = Number(process.env.PORT) || 5000
const app = express()
db.connect()

/**
 * 1. middleware (express.json) parses every json object forward
 * 2. middleware (express.urlencoded) parses json objects from previous
 *    middleware and returns UTF-8 decoded key value pairs
 * 3. middleware (express-session) takes care of sessions. We send POST request for
 *    register to the server, HTTP header's request section looks like this:
 *    { ..., cookie: "", ... }. Server sees the empty cookie, creates session
 *    with express-session, saves it into MongoDB and sends back header's
 *    response section { ..., set-cookie: "SESSION-ID:some123idrandom2345", ...}.
 *    If it is not first request, then it only checks current SESSION-ID from cookie
 *    in database. When cookie time is up, it repeats the session creation process.
 *    IMPORTANT: it adds property session to the Express Request object `req.session`
 * 4. middleware (passport.initialize) requires express-session to work properly, that's
 *    why it is used after. Passport.initialize() runs before every HTTP request, first
 *    it checks, if current session has `req.session.passport` object, which is of type
 *    { user: <user-id> }, then it checks, if any session from database has same
 *    `req.session.passport` property, it grabs user id and saves it internally
 * 5. middleware (passport.session) calls strategies that we set up, first it takes the
 *    user id from `passport.initialize()` middleware and passes it to
 *    `passport.deserializeUser()`, which looks up user id and returns correct user.
 *    If deserialize function returns valid user object, it is attached to `req.user`
 *    property and can be accesed within the route. If no user is returned, nothing
 *    happens and it calls `next()`
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/auth', authRoute)
app.listen(PORT, () => console.log(`http://localhost:${PORT}/auth`))
