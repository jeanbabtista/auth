import { Request } from 'express'

declare global {
    namespace Express {
        export interface Request {
            jwtToken?: any
            user?: {
                username: string
                hash: string
                isAdmin: boolean
            }
        }
    }
}

export interface RequestPostLogin {
    username: string
    password: string
}
