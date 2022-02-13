import { Request, Response, NextFunction } from 'express'
import { getJsonMessage } from '../lib/utils'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isUnauthenticated())
        return res.status(401).json(getJsonMessage(true, 'Unauthorized access'))

    next()
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user)
        return res
            .status(401)
            .json(getJsonMessage(true, 'User object does not exist'))

    if (!user.isAdmin)
        return res
            .status(401)
            .json(getJsonMessage(true, 'Only admins can access this page'))

    next()
}

export { isAuthenticated, isAdmin }
