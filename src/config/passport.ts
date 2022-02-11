import passport from 'passport'
import bcrypt from 'bcrypt'
import { IStrategyOptions, Strategy as LocalStrategy, VerifyFunction } from 'passport-local'
import User from '../models/User'

passport.serializeUser((user: { id?: number }, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id: number, cb) => {
    try {
        const user = await User.findById(id)
        cb(null, user)
    } catch (e: any) {
        cb(e)
    }
})

/**
 *
 * @param {String} username - username field for user
 * @param {String} password - password field for user
 * @param {Function} done - receives error object as first parameter and user as second.
 * This object is passed to `deserializeUser()`. There are 3 possible use cases for this function:
 * 1. `done(err)`, which is used to pass error to next middleware
 * 2. `done(null, false)`, which indicates that there is no error, but user is not authenticated
 * 3. `done(null, user)`, which indicates that there is no error and user is successfully authenticated
 */
const verify: VerifyFunction = async (username: string, password: string, done: Function) => {
    try {
        const user = await User.findOne({ username })
        if (!user) return done(null, false)

        // if valid password, redirect to /login-success and send user object to next middleware, else go to /login-failure
        const isValid = bcrypt.compareSync(password, user.hash.toString())
        done(null, isValid ? user : false)
    } catch (e: any) {
        done(e)
    }
}

const options: IStrategyOptions = {
    usernameField: 'username', // default
    passwordField: 'password' // default
}

passport.use(new LocalStrategy(options, verify))

export = passport
