import { Request, Response, NextFunction } from 'express'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return next()
    res.status(400).json({ error: true, message: 'Unauthorized access' })
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.isAdmin) return next()
    res.status(400).json({ error: true, message: 'Unauthorized access' })
}

export = {
    isAuthenticated,
    isAdmin
}
