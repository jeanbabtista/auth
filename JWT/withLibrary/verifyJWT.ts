import * as jwt from 'jsonwebtoken'
import fs from 'fs'
import { join } from 'path'

const JWT = fs.readFileSync(join(__dirname, 'JWT.txt')).toString()
const publicKey = fs.readFileSync(join(__dirname, '../keys/public.pem'), 'utf8')

try {
    const payload = jwt.verify(JWT, publicKey, { algorithms: ['RS256'] })
    console.log('JWT payload:', payload)
} catch (e: any) {
    console.log('JWT error:', e.message)
}
