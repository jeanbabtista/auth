import { Request, Response, NextFunction } from 'express'
import { getJsonMessage, verifyToken } from '../lib/utils'
import { UserMongoose } from 'types'

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['authorization_token']
        const decoded = <UserMongoose>verifyToken(token)

        req.currentUser = decoded
        next()
    } catch (e: any) {
        res.status(401).json(getJsonMessage(true, e.message))
    }
}

export { authenticateJWT }
