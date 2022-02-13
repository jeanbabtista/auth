import { Request, Response } from 'express'
import { getJsonMessage, getToken } from '../lib/utils'

const getIndex = (_req: Request, res: Response) =>
    res.json(getJsonMessage(false, 'Hello World! Everyone can see this!'))

const getProtected = (req: Request, res: Response) => {
    res.status(200).json(
        getJsonMessage(false, 'Successfully fetched user', req.currentUser)
    )
}

// save jwt into cookie after successfull google login
const getGoogleCallback = (req: Request, res: Response) => {
    const user = req.currentUser

    // create new jwt token for our server
    const token = getToken(user)

    res.cookie('authorization_token', token, {
        maxAge: 900000,
        httpOnly: true,
        secure: false
    })

    res.status(200).json(getJsonMessage(false, 'Successfully logged in', user))
}

export default {
    getGoogleCallback,
    getProtected,
    getIndex
}
