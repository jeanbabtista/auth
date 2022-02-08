import { Request, Response, NextFunction } from 'express'
import { IUser } from '../models/User'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    console.log('isAuthenticated')
    if (req.isUnauthenticated()) return res.status(401).json({ error: true, message: 'Unauthorized access' })
    next()
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log('isAdmin')
    const user = <IUser>req.user

    if (!user) return res.status(401).json({ error: true, message: 'User object does not exist' })
    if (!user.isAdmin) return res.status(401).json({ error: true, message: 'Only admins can access this page' })

    next()
}

export { isAuthenticated, isAdmin }
