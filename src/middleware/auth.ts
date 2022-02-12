import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'
import { join } from 'path'
import { getJsonMessage } from '../lib/utils'
import { UserMongoose } from 'types'

const path = join(__dirname, '..', '..', 'id_rsa_pub.pem')
const publicKey = readFileSync(path, 'utf-8')

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

export { authenticateJWT }
