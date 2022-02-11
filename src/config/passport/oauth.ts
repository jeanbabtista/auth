import {
    Strategy,
    StrategyOptionsWithRequest,
    VerifyFunctionWithRequest
} from 'passport-google-oauth2'
import User, { IUser } from '../../models/User'

const options: StrategyOptionsWithRequest = {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    passReqToCallback: true
}

const verify: VerifyFunctionWithRequest = async (
    request,
    accessToken,
    refreshToken,
    profile: IUser,
    done
) => {
    try {
        const user = User.findOne({ googleId: profile.id })
        done(null, user)
    } catch (e: any) {
        done(e)
    }
}

export = new Strategy(options, verify)
