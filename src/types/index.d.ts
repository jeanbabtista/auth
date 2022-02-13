import { Document, Types } from 'mongoose'

interface RequestPostLogin {
    email: string
    password: string
}

interface RequestPostRegister extends RequestPostLogin {
    username: string
}

interface UserMongoose extends Document {
    email: string
    username: string
    hash: string
    isAdmin: boolean
}

interface IJwtPayload {
    sub: Types.ObjectId
    iat: number
}

declare global {
    namespace Express {
        interface Request {
            body: RequestPostLogin
            currentUser: UserMongoose
        }
    }
}
