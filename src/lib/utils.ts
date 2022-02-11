import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'
import { join } from 'path'
import { Types } from 'mongoose'
import { IUser } from '../models/User'

const path = join(__dirname, '..', '..', 'id_rsa_priv.pem')
const privateKey = readFileSync(path, 'utf-8')

/**
 * @param {Types.ObjectId} sub - holds id of the user
 * @param {number} iat - issuing date of JWT
 */
export interface IJwtPayload {
    sub: Types.ObjectId
    iat: number
}

/**
 * @param {IUser} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
const issueJWT = (user: IUser) => {
    const { _id: id } = user
    const expiresIn = '1d'

    const payload: IJwtPayload = { sub: id, iat: Date.now() }
    const token = jwt.sign(payload, privateKey, {
        expiresIn,
        algorithm: 'RS256'
    })

    // token needs to be of exact format 'Bearer: <token>', because we are using
    // Authorization header to retrieve JWT
    return { token: `Bearer ${token}`, expiresIn }
}

const getJsonMessage = (
    error: Boolean,
    message: string,
    data?: { token: string; expiresIn: string }
) => ({
    error,
    message,
    data
})

export { issueJWT, getJsonMessage }
