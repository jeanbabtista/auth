import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'
import { join } from 'path'
import { getJsonMessage } from '../lib/utils'
import { UserMongoose } from 'types'
import User from 'models/User'

const path = join(__dirname, '..', '..', 'id_rsa_pub.pem')
const publicKey = readFileSync(path, 'utf-8')

const customJwtCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers
    if (!authorization)
        return res
            .status(401)
            .json(getJsonMessage(true, 'No authorization header'))

    // check authorization header format
    const [name, token] = authorization.split(' ')

    if (
        token.split('.').length !== 3 ||
        name !== 'Bearer' ||
        !token.match(/\S+\.\S+\.\S+/)
    )
        return res
            .status(401)
            .json(getJsonMessage(true, 'Wrong authorization header format'))

    // check if valid signature
    try {
        const validToken = jwt.verify(token, publicKey, {
            algorithms: ['RS256']
        })

        const { sub: id } = validToken
        const user = await User.findById(id)

        if (user) req.currentUser = user
        next()
    } catch (e: any) {
        res.status(401).json(getJsonMessage(true, e.message))
    }
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['authorization_token']
        const decoded = <UserMongoose>(
            jwt.verify(token, publicKey, { algorithms: ['RS256'] })
        )

        req.currentUser = decoded
        next()
    } catch (e: any) {
        res.status(401).json(getJsonMessage(true, e.message))
    }
}

export { customJwtCheck }
