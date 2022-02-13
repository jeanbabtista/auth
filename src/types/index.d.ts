import { Document, Types } from 'mongoose'

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

interface IJwtPayload {
    sub: Types.ObjectId
    iat: number
}

declare global {
    namespace Express {
        interface Request {
            body: RequestPostLogin | RequestGoogleCallback
            currentUser: UserMongoose
        }

        interface User {
            _id?: string
            email?: string
            googleId?: string
            username?: string
            photo?: string
            isAdmin: boolean
        }
    }
}
