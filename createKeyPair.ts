import { generateKeyPairSync } from 'crypto'
import fs from 'fs'
import { join } from 'path'

// https://nodejs.org/api/crypto.html#cryptogeneratekeypairsynctype-options
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
})

fs.writeFileSync(join(__dirname, 'id_rsa_priv.pem'), privateKey)
fs.writeFileSync(join(__dirname, 'id_rsa_pub.pem'), publicKey)
