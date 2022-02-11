import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { readFileSync } from 'fs'
import { join } from 'path'
import { IUser } from '../models/User'
import { getJsonMessage } from '../lib/utils'
import CustomRequest from '../@types/index'

// local strategy with passport js
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    console.log('isAuthenticated')
    if (!req.isAuthenticated())
        // only checks if req.session.passport.user exists
        return res.status(401).json(getJsonMessage(true, 'Unauthorized access'))
    next()
}

// local strategy with passport jsy
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log('isAdmin')
    const user = req.user as IUser

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

// jwt strategy with passport js
const isValidJwt = (_req: Request, _res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }) // behind the scenes is only jwt.verify(...)
    next()
}

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

export { isAuthenticated, isAdmin, isValidJwt, customJwtCheck }
