import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    username: String,
    hash: String,
    salt: String
})

export default model('User', UserSchema)
