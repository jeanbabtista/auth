import passport from 'passport'
import jwtStrategy from './jwt'
import oauthStrategy from './oauth'

passport.use(jwtStrategy)
passport.use(oauthStrategy)

export = passport
