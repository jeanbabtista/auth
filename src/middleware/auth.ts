import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'
import { join } from 'path'
import { getJsonMessage } from '../lib/utils'

const path = join(__dirname, '..', '..', 'id_rsa_pub.pem')
const publicKey = readFileSync(path, 'utf-8')

const customJwtCheck = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization)
        return res
            .status(401)
            .json(getJsonMessage(true, 'No authorization header'))

    // check authorization header format
    const [name, token] = authorization.split(' ')
    if (name !== 'Bearer' || !token.match(/\S+\.\S+\.\S+/))
        return res
            .status(401)
            .json(getJsonMessage(true, 'Wrong authorization header format'))

    // check if valid signature
    try {
        const validToken = jwt.verify(token, publicKey, {
            algorithms: ['RS256']
        })

        req.jwtToken = validToken
        next()
    } catch (e: any) {
        res.status(401).json(getJsonMessage(true, 'Invalid token'))
    }
}

export { customJwtCheck }
