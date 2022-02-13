import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { readFileSync } from 'fs'
import { join } from 'path'
import { IJwtPayload, UserMongoose } from 'types'

const publicKey = readFileSync(
    join(__dirname, '..', '..', 'id_rsa_pub.pem'),
    'utf-8'
)
const privateKey = readFileSync(
    join(__dirname, '..', '..', 'id_rsa_priv.pem'),
    'utf-8'
)

const getJsonMessage = (error: Boolean, message: string, data?: any) => ({
    error,
    message,
    data
})

const getHash = (password: string) => bcrypt.hashSync(password, 10)

const isValidPassword = (password: string, hash: string) =>
    bcrypt.compareSync(password, hash)

const issueToken = (data: any) =>
    jwt.sign(data, privateKey, { algorithm: 'RS256' })

const verifyToken = (token: string) =>
    jwt.verify(token, publicKey, { algorithms: ['RS256'] })

const getToken = (data: any) => {
    const user = <UserMongoose>data

    const payload: IJwtPayload = { sub: user._id, iat: Date.now() }
    const token = issueToken(payload)

    return token
}

export { getHash, isValidPassword, getToken, verifyToken, getJsonMessage }
