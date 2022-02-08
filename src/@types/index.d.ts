import { Request } from 'express'

declare namespace Express {
    interface Request {
        user: {
            username: string
            hash: string
            isAdmin: boolean
        }
    }
}
