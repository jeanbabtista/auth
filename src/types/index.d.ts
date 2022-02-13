import { Document } from 'mongoose'

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

declare global {
    namespace Express {
        interface Request {
            body: RequestPostLogin
        }

        interface User extends UserMongoose {}
    }
}
