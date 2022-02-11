import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'
import { join } from 'path'
import { IUser } from '../models/User'

const path = join(__dirname, '..', '..', 'id_rsa_priv.pem')
const privateKey = readFileSync(path, 'utf-8')

/**
 * @param {IUser} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
const issueJWT = (user: IUser) => {
    const { _id: id } = user
    const expiresIn = '1d'

    const payload = { sub: id, iat: Date.now() }
    const token = jwt.sign(payload, privateKey, { expiresIn, algorithm: 'RS256' })

    return { token, expiresIn }
}

export = { issueJWT }
