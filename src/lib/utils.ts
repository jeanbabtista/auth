import bcrypt from 'bcrypt'

const getJsonMessage = (error: Boolean, message: string, data?: any) => ({
    error,
    message,
    data
})

const getHash = (password: string) => bcrypt.hashSync(password, 10)

const isValidPassword = (password: string, hash: string) =>
    bcrypt.compareSync(password, hash)

export { getJsonMessage, getHash, isValidPassword }
