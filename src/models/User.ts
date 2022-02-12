import { Schema, model } from 'mongoose'
import { UserMongoose } from 'types'

const schema = new Schema<UserMongoose>({
    email: { type: String, required: true, unique: true },
    googleId: String,
    username: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    photo: String
})

export default model<UserMongoose>('User', schema)
