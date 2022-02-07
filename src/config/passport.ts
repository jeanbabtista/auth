import passport from 'passport'
import { IStrategyOptions, Strategy as LocalStrategy, VerifyFunction } from 'passport-local'
import User from '../models/User'
import { isValidPassword } from '../lib/passwordUtils'

const options: IStrategyOptions = {
    usernameField: 'uname',
    passwordField: 'pw'
}

const verify: VerifyFunction = async (username, password, done) => {
    try {
        const user = await User.findOne({ username })
        if (!user) return done(null, false)

        const isValid = isValidPassword(password, user.hash, user.salt)
        done(null, isValid ? user : false)
    } catch (e: any) {
        done(e)
    }
}

passport.use(new LocalStrategy(options, verify))
