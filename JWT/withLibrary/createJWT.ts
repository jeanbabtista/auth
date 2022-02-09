import * as jwt from 'jsonwebtoken'
import fs from 'fs'
import { join } from 'path'

const payload = {
    sub: '1234567890',
    name: 'John Doe',
    iat: 1516239022
}

// podpis
const privateKey = fs.readFileSync(join(__dirname, '../keys/private.pem'), 'utf8')
const JWT = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

fs.writeFileSync(join(__dirname, 'JWT.txt'), JWT)
