import passport from 'passport'
import localStrategy from './local'

passport.use(localStrategy)

export = passport
