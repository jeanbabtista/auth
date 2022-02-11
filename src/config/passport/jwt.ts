import User from '../../models/User'
import {
    Strategy as JwtStrategy,
    ExtractJwt,
    StrategyOptions,
    VerifyCallback
} from 'passport-jwt'
import { readFileSync } from 'fs'
import { join } from 'path'
import { IJwtPayload } from '../../lib/utils'

const path = join(__dirname, '..', '..', 'id_rsa_pub.pem')
const publicKey = readFileSync(path, 'utf-8')

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey,
    algorithms: ['RS256']
}

const verify: VerifyCallback = async (payload: IJwtPayload, done) => {
    console.log('verifyCallback')

    const { sub: id } = payload

    try {
        const user = await User.findOne({ _id: id })
        return done(null, user ? user : false)
    } catch (e: any) {
        done(e, false)
    }
}

export = new JwtStrategy(options, verify)
