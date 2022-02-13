import { Schema, model } from 'mongoose'
import { UserMongoose } from 'types'

const schema = new Schema<UserMongoose>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    hash: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
})

export default model<UserMongoose>('User', schema)
