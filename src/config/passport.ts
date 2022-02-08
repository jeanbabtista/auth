import passport from 'passport'
import { IStrategyOptions, Strategy as LocalStrategy, VerifyFunction } from 'passport-local'
import User from '../models/User'
import { isValidPassword } from '../lib/passwordUtils'

// default options for verify function callback
// const options: IStrategyOptions = {
//     usernameField: 'username',
//     passwordField: 'password'
// }

// called after POST login request for `passport.authenticate()` method
const verify: VerifyFunction = async (username, password, done) => {
    try {
        const user = await User.findOne({ username })
        if (!user) return done(null, false)

        const isValid = isValidPassword(password, user.hash.toString(), user.salt.toString())

        if (isValid)
            // redirect to /login-success, sends user object forward to passport
            done(null, user)
        // redirect to /login-failure
        else done(null, false)
    } catch (e: any) {
        done(e)
    }
}

passport.use(new LocalStrategy(/*options,*/ verify))

// (de)serializeUser() functions are only for SessionStrategy (implemented by passport)!
// populates req.session.passport.user object with user id
passport.serializeUser((user: { id?: number }, done) => done(null, user.id))

// populates req.user object
passport.deserializeUser(async (id: number, cb) => {
    try {
        const user = await User.findById(id)
        cb(null, user)
    } catch (e: any) {
        cb(e)
    }
})

export = passport
