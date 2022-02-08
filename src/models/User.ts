import { Schema, model, Document } from 'mongoose'

export interface IUser {
    username: string
    hash: string
    isAdmin: boolean
}

const schema = new Schema<IUser>({
    username: { type: String, required: true },
    hash: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
})

export default model<IUser>('User', schema)
