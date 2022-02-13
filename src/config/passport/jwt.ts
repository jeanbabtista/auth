import { Strategy, StrategyOptions, VerifyCallback } from 'passport-jwt'
import { readFileSync } from 'fs'
import { join } from 'path'
import { IJwtPayload } from 'types'
import User from '../../models/User'

const publicKey = readFileSync(
    join(__dirname, '..', '..', '..', 'id_rsa_pub.pem'),
    'utf-8'
)

const options: StrategyOptions = {
    jwtFromRequest: (req) =>
        req && req.cookies ? req.cookies['authorization_token'] : null,
    secretOrKey: publicKey,
    algorithms: ['RS256']
}

const verify: VerifyCallback = async (payload: IJwtPayload, done) => {
    try {
        const user = await User.findById(payload.sub)
        return done(null, user ? user : false)
    } catch (e: any) {
        done(e, false)
    }
}

export = new Strategy(options, verify)
