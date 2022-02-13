import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'
import { join } from 'path'
import { IJwtPayload, UserMongoose } from 'types'

const path = join(__dirname, '..', '..', 'id_rsa_priv.pem')
const privateKey = readFileSync(path, 'utf-8')

const getJsonMessage = (error: Boolean, message: string, data?: any) => ({
    error,
    message,
    data
})

const issueJWT = (user: UserMongoose) => {
    const { _id: id } = user
    const expiresIn = '1d'

    const payload: IJwtPayload = { sub: id, iat: Date.now() }
    const token = jwt.sign(payload, privateKey, {
        expiresIn,
        algorithm: 'RS256'
    })

    return { token: `Bearer ${token}`, expiresIn }
}

export { issueJWT, getJsonMessage }
