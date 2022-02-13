import { Request, Response } from 'express'
import axios from 'axios'
import {
    getJsonMessage,
    getTokens,
    getGoogleAuthUrl,
    issueToken
} from '../lib/utils'
import User from '../models/User'

const getIndex = (_req: Request, res: Response) =>
    res.json(getJsonMessage(false, 'Hello World! Everyone can see this!'))

const getGoogleLogin = async (_req: Request, res: Response) =>
    res.redirect(getGoogleAuthUrl())

const getProtected = (req: Request, res: Response) => {
    res.status(200).json(
        getJsonMessage(false, 'Successfully fetched user', req.currentUser)
    )
}

const getGoogleCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string
    const { id_token, access_token } = await getTokens(code)

    try {
        const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            { headers: { Authorization: `Bearer ${id_token}` } }
        )

        const { id: googleId, email, picture: photo, name: username } = data

        // * if user does not exist yet, register user
        const found = await User.findOne({ googleId })
        if (!found) await new User({ googleId, email, username, photo }).save()

        const token = issueToken(data)

        res.cookie('authorization_token', token, {
            maxAge: 900000,
            httpOnly: true,
            secure: false
        })

        res.status(200).json(
            getJsonMessage(false, 'Successfully logged in', data)
        )
    } catch (e: any) {
        res.status(401).json(getJsonMessage(true, e.message))
    }
}

export default {
    getGoogleLogin,
    getGoogleCallback,
    getProtected,
    getIndex
}
