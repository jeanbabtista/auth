import passport from 'passport'
import jwtStrategy from './jwt'

passport.use(jwtStrategy)

export = passport
