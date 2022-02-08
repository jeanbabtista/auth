import { Schema, model } from 'mongoose'

interface User {
    username: String
    hash: String
    salt: String
    isAdmin: Boolean
}

const schema = new Schema<User>({
    username: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
})

export default model<User>('User', schema)
