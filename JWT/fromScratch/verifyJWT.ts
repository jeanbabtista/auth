import base64Url from 'base64url'
import { createVerify } from 'crypto'
import fs from 'fs'
import { join } from 'path'

const JWT = fs.readFileSync(join(__dirname, 'JWT.txt')).toString()
const [headerBase64Url, payloadBase64Url, signatureBase64Url] = JWT.split('.')

// podpis je validen, če velja headerBase64Url + payloadBase64Url === verifiedWithPublicKey(signatureBase64Url, publicKey)
const verifyFunction = createVerify('RSA-SHA256')
const publicKey = fs.readFileSync(join(__dirname, '../keys/public.pem'), 'utf8')

verifyFunction.write(headerBase64Url + '.' + payloadBase64Url) // ta del sporočila bomo primerjali z podpisom
verifyFunction.end()

const signatureBase64 = base64Url.toBase64(signatureBase64Url) // crypto js sprejema le base64 kodiranje, zato format moramo spremeniti iz base64Url

const isValid = verifyFunction.verify(publicKey, signatureBase64, 'base64')

if (isValid) console.log('Signature is valid! You can trust this client!')
else console.log('Signature invalid! Abort!')
