import base64Url from 'base64url'
import { createSign } from 'crypto'
import fs from 'fs'
import { join } from 'path'

const header = JSON.stringify({
    alg: 'RS256',
    typ: 'JWT'
})

const payload = JSON.stringify({
    sub: '1234567890',
    name: 'John Doe',
    iat: '1516239022'
})

// podpis
const signFunction = createSign('RSA-SHA256')
const privateKey = fs.readFileSync(join(__dirname, '../keys/private.pem'), 'utf8')

signFunction.write(base64Url(header) + '.' + base64Url(payload))
signFunction.end()
const signatureBase64 = signFunction.sign(privateKey, 'base64') // kodiramo podpis z base64
const signatureBase64Url = base64Url.fromBase64(signatureBase64) // kodiramo podpis iz base64 v base64Url

// podatke zložimo skupaj v žeton
const JWT = base64Url(header) + '.' + base64Url(payload) + '.' + signatureBase64Url
fs.writeFileSync(join(__dirname, 'JWT.txt'), JWT)
