import { Request, Response } from 'express'
import { issueJWT, getJsonMessage } from '../lib/utils'
import { UserMongoose } from 'types'

const getGoogleLogin = async (_req: Request, res: Response) => {
    res.send('<a href="/auth/google>Google Signin</a>')
}

const getProtected = (req: Request, res: Response) => {
    if (!req.user)
        return res.status(401).json(getJsonMessage(true, 'User does not exist'))

    const { username } = <UserMongoose>req.user
    res.status(200).json(getJsonMessage(false, `Hello ${username}!`))
}

const getGoogleCallback = async (req: Request, res: Response) => {
    console.log(req.user)
    if (!req.user)
        return res.status(401).json(getJsonMessage(true, 'User error'))

    res.status(200).json(getJsonMessage(false, 'Hello World!'))
}

export default {
    getGoogleLogin,
    getGoogleCallback,
    getProtected
}
