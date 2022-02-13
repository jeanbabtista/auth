import { Request, Response } from 'express'
import { issueJWT, getJsonMessage } from '../lib/utils'

const getIndex = (_req: Request, res: Response) =>
    res.json(getJsonMessage(false, 'Hello World! Everyone can see this!'))

const getProtected = (req: Request, res: Response) => {
    res.status(200).json(
        getJsonMessage(false, 'Successfully fetched user', req.currentUser)
    )
}

export default {
    getProtected,
    getIndex
}
