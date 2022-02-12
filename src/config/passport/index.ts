import passport from 'passport'
import oauthStrategy from '../../config/passport/oauth'

passport.use(oauthStrategy)

export = passport
