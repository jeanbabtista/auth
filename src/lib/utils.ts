import axios from 'axios'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { stringify } from 'querystring'
import { readFileSync } from 'fs'
import { join } from 'path'

config()
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI } = process.env

const publicKey = readFileSync(
    join(__dirname, '..', '..', 'id_rsa_pub.pem'),
    'utf-8'
)
const privateKey = readFileSync(
    join(__dirname, '..', '..', 'id_rsa_priv.pem'),
    'utf-8'
)

const getJsonMessage = (error: Boolean, message: string, data?: any) => ({
    error,
    message,
    data
})

const getGoogleAuthUrl = () => {
    const url = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = stringify({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' '),
        access_type: 'offline',
        prompt: 'consent',
        response_type: 'code'
    })

    return `${url}?${options}`
}

const getTokens = async (
    code: string
): Promise<{
    access_token: string
    expires_in: Number
    refresh_token: string
    scope: string
    id_token: string
}> => {
    const data = stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
    })

    try {
        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            data,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )

        return response.data
    } catch (e: any) {
        throw new Error(e.message)
    }
}

const issueToken = (data: any) =>
    jwt.sign(data, privateKey, { algorithm: 'RS256' })

const verifyToken = (token: string) =>
    jwt.verify(token, publicKey, { algorithms: ['RS256'] })

export { getJsonMessage, getGoogleAuthUrl, getTokens, issueToken, verifyToken }
