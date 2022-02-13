import { Request, Response } from 'express'
import User from '../models/User'
import { getJsonMessage, getHash } from '../lib/utils'
import { RequestPostRegister } from 'types'

const getIndex = (_req: Request, res: Response) =>
    res.json(getJsonMessage(false, 'Hello World! Everyone can see this!'))

const getProtected = (req: Request, res: Response) => {
    res.status(200).json(
        getJsonMessage(false, 'Successfully logged in', req.user)
    )
}

const postRegister = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body as RequestPostRegister
        const hash = getHash(password)
        const user = new User({ email, username, hash, isAdmin: false })

        // * if user does not exist yet, register user
        const found = await User.findOne({ email })
        if (found) throw new Error('User already exists.')

        const saved = await user.save()
        res.status(200).json(
            getJsonMessage(false, 'Successfully saved user', saved)
        )
    } catch (e: any) {
        res.status(400).json(getJsonMessage(true, e.message))
    }
}

const postLogin = (req: Request, res: Response) => {
    if (!req.isAuthenticated())
        return res.status(401).json(getJsonMessage(true, 'Failed to log in'))

    res.status(200).json(getJsonMessage(false, 'Successfully logged in'))
}

const getLogout = (req: Request, res: Response) => {
    req.logout() // only deletes req.session.passport.user property
    res.status(200).json(getJsonMessage(false, 'Successfully logged out'))
}

export default {
    postLogin,
    postRegister,
    getIndex,
    getProtected,
    getLogout
}
