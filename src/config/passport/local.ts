import passport from 'passport'
import { Strategy, IStrategyOptions, VerifyFunction } from 'passport-local'
import { isValidPassword } from '../../lib/utils'
import User from '../../models/User'

passport.serializeUser((user: { id?: number }, done) => done(null, user.id))

passport.deserializeUser(async (id: number, cb) => {
    try {
        const user = await User.findById(id)
        cb(null, user)
    } catch (e: any) {
        cb(e)
    }
})

const options: IStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password'
}

const verify: VerifyFunction = async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
        if (!user) return done(null, false)

        const isValid = isValidPassword(password, user.hash)
        done(null, isValid ? user : false)
    } catch (e: any) {
        done(e)
    }
}

export = new Strategy(options, verify)
