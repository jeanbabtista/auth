import { Document } from 'mongoose'

interface RequestGoogleCallback {
    code: string
    scope: string
    authuser: string
    prompt: string
}

interface RequestPostLogin {
    email: string
}

interface UserMongoose extends Document {
    email: string
    googleId: string
    username: string
    isAdmin: boolean
    photo?: string
}

declare global {
    namespace Express {
        interface Request {
            body: RequestPostLogin | RequestGoogleCallback
        }

        interface User {
            id?: string
            email?: string
            googleId?: string
            username?: string
            photo?: string
        }
    }
}
