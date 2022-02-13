import { Request, Response } from 'express'
import {
    getJsonMessage,
    getHash,
    getToken,
    isValidPassword
} from '../lib/utils'
import User from '../models/User'
import { RequestPostLogin, RequestPostRegister } from 'types'

const getIndex = (_req: Request, res: Response) =>
    res.json(getJsonMessage(false, 'Hello World! Everyone can see this!'))

const getProtected = (req: Request, res: Response) => {
    res.status(200).json(
        getJsonMessage(false, 'Successfully fetched user', req.currentUser)
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

const postLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body as RequestPostLogin

    try {
        const user = await User.findOne({ email })
        if (!user) throw new Error('Failed to fetch user in database')

        const isValid = isValidPassword(password, user.hash)
        if (!isValid) throw new Error('Wrong password was provided')

        const token = getToken(user)

        res.cookie('authorization_token', token, {
            maxAge: 900000,
            httpOnly: true,
            secure: false
        })

        res.status(200).json(
            getJsonMessage(false, 'Successfully logged in', user)
        )
    } catch (e: any) {
        res.status(400).json(getJsonMessage(true, e.message))
    }
}

export default {
    postLogin,
    postRegister,
    getProtected,
    getIndex
}
