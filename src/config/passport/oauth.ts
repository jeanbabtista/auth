import {
    Strategy,
    StrategyOptionsWithRequest,
    VerifyFunctionWithRequest
} from 'passport-google-oauth2'
import { config } from 'dotenv'
import User from '../../models/User'

config()
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

const options: StrategyOptionsWithRequest = {
    clientID: GOOGLE_CLIENT_ID || '',
    clientSecret: GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
}

const verify: VerifyFunctionWithRequest = async (
    request,
    _accessToken,
    _refreshToken,
    profile,
    done
) => {
    try {
        const {
            id: googleId,
            displayName: username,
            email,
            photos: [{ value: photo }]
        } = profile

        const found = await User.findOne({ googleId })

        // user already exists
        if (found) return done(null, found)

        // register user
        const user = await new User({ email, googleId, username, photo }).save()
        request.user = user
        done(null, user)
    } catch (e: any) {
        done(e)
    }
}

export = new Strategy(options, verify)
