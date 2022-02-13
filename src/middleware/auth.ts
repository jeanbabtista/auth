import { Request, Response, NextFunction } from 'express'
import { getJsonMessage, verifyToken } from '../lib/utils'
import User from '../models/User'

const authenticateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies['authorization_token']
        const decoded = verifyToken(token)

        const user = await User.findById(decoded.sub)
        if (!user) throw new Error('user not found')

        req.currentUser = user
        next()
    } catch (e: any) {
        res.status(401).json(getJsonMessage(true, e.message))
    }
}

export { authenticateJWT }
